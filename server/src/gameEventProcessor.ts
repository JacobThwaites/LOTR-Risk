import { WebSocketServer } from "ws";
import { Areas } from "./gameLogic/Enums/Areas";
import { Game } from "./gameLogic/Models/Game";
import { emitMessage } from "./webSockets";
import { CombatController } from "./gameLogic/Controllers/CombatController";
import { AreaType } from "./gameLogic/Models/AreaType";
import { UnitMoveController } from "./gameLogic/Controllers/UnitMoveController";
import GameEventMessageFactory, { GameEventType } from "./GameEventMessageFactory";
import { WebSocketManager } from "./WebSocketManager";


export function updateGame(messageData: any, game: Game, wss: WebSocketServer, webSocketManager: WebSocketManager): void {
    let currentPlayer = game.getCurrentPlayer();
    
    // TODO: don't do this if player joined or disconnected message
    if (currentPlayer.getUserID() !== messageData.userID && messageData.type !== GameEventType.PLAYER_JOINED) {
        console.log("message sent from incorrect player");
        return;
    }

    switch (messageData.type) {
        case GameEventType.STARTING_REINFORCEMENT: {
            const area = Areas[messageData.areaName];
            currentPlayer.addReinforcementsToArea(area);
            const areaUpdateMessage = GameEventMessageFactory.generateAreaUpdateMessage(area);

            emitMessage(areaUpdateMessage, wss);

            if (currentPlayer.getReinforcements() < 1) {
                game.changeCurrentPlayer();
                currentPlayer = game.getCurrentPlayer();
                const changePlayerMessage = GameEventMessageFactory.generateChangePlayerMessage(currentPlayer.getColour());
                emitMessage(changePlayerMessage, wss);
            }

            const reinforcementsAvailable = currentPlayer.getReinforcements();
            const reinforcementsAvailableMessage = GameEventMessageFactory.generateReinforcementsAvailableMessage(reinforcementsAvailable);
            emitMessage(reinforcementsAvailableMessage, wss);

            if (!game.playersHaveReinforcements()) {
                const endOfStartingReinforcementsMessage = GameEventMessageFactory.generateEndOfStartingReinforcementsMessage();
                emitMessage(endOfStartingReinforcementsMessage, wss);
            }
            
            break;
        }
        case GameEventType.REINFORCEMENT: {
            const area = Areas[messageData.areaName];
            currentPlayer.addReinforcementsToArea(area);
            const reinforcementUpdateMessage = GameEventMessageFactory.generateReinforcementUpdateMessage(messageData.areaName);
            emitMessage(reinforcementUpdateMessage, wss);

            const reinforcementsAvailable = currentPlayer.getReinforcements();
            const reinforcementsAvailableMessage = GameEventMessageFactory.generateReinforcementsAvailableMessage(reinforcementsAvailable);
            emitMessage(reinforcementsAvailableMessage, wss);
            break;
        }
        case GameEventType.END_TURN: {
            const previousCurrentPlayer = game.getCurrentPlayer();
            game.handleNewTurn();

            const territoryCardMessage = GameEventMessageFactory.generateTerritoryCardMessage(previousCurrentPlayer);
            webSocketManager.messageIndividualClient(game.getUUID(), previousCurrentPlayer.getUserID(), territoryCardMessage);

            const newCurrentPlayer = game.getCurrentPlayer();
            const endTurnMessage = GameEventMessageFactory.generateEndTurnMessage(newCurrentPlayer.getColour());
            emitMessage(endTurnMessage, wss);

            const reinforcementsAvailable = newCurrentPlayer.getReinforcements();
            const reinforcementsAvailableMessage = GameEventMessageFactory.generateReinforcementsAvailableMessage(reinforcementsAvailable);
            emitMessage(reinforcementsAvailableMessage, wss);

            if (game.areMaxTurnsReached()) {
                const gameOverMessage = GameEventMessageFactory.generateGameOverMessage();
                emitMessage(gameOverMessage, wss);
            }

            break;
        }
        case GameEventType.CLEAR_SELECTED_AREAS: {
            const message = GameEventMessageFactory.generateClearSelectedAreasMessage();
            emitMessage(message, wss);
            break;
        }
        case GameEventType.COMBAT: {
            const attackingArea = Areas[messageData.attackingArea];
            const defendingArea = Areas[messageData.defendingArea];
            const combatController = new CombatController(
                attackingArea,
                defendingArea,
                game!
            );
            const results = combatController.getCombatResults(messageData.numAttackingDice);
            combatController.handleResults(results);

            const combatResultsMessage = GameEventMessageFactory.generateCombatResultsMessage(attackingArea, defendingArea);
            emitMessage(combatResultsMessage, wss);

            if (defendingArea.hasNoUnitsRemaining()) {
                const message = GameEventMessageFactory.generateUnitMoveSetupMessage(attackingArea, defendingArea);
                emitMessage(message, wss);
            }
            break;
        }
        case GameEventType.UNIT_MOVE: {
            const origin = Areas[messageData.origin];
            const destination = Areas[messageData.destination];
            handleUnitMove(origin, destination, messageData.numUnits);

            const originUpdateMessage = GameEventMessageFactory.generateAreaUpdateMessage(origin);
            const destinationUpdateMessage = GameEventMessageFactory.generateAreaUpdateMessage(destination);
            emitMessage(originUpdateMessage, wss);
            emitMessage(destinationUpdateMessage, wss);

            const unitMoveCompleteMessage = GameEventMessageFactory.generateUnitMoveCompleteMessage();
            emitMessage(unitMoveCompleteMessage, wss);
            break;
        }
        case GameEventType.TROOP_TRANSFER_SETUP: {
            const message = GameEventMessageFactory.generateTroopTransferMessage();
            emitMessage(message, wss);
            break;
        }
        case GameEventType.TROOP_TRANSFER: {
            const origin = Areas[messageData.origin];
            const destination = Areas[messageData.destination];
            handleUnitMove(origin, destination, messageData.numUnits);

            const originUpdateMessage = GameEventMessageFactory.generateAreaUpdateMessage(origin);
            const destinationUpdateMessage = GameEventMessageFactory.generateAreaUpdateMessage(destination);
            emitMessage(originUpdateMessage, wss);
            emitMessage(destinationUpdateMessage, wss);

            const troopTransferCompleteMessage = GameEventMessageFactory.generateTroopTransferCompleteMessage();
            emitMessage(troopTransferCompleteMessage, wss);
            break;
        }
        case GameEventType.PLAYER_JOINED: {
            break;
        }
        case GameEventType.PLAYER_DISCONNECT: {
            break;
        }
        case GameEventType.GAME_OVER_DISCONNECT: {
            const gameOverMessage = GameEventMessageFactory.generateGameOverMessage();
            emitMessage(gameOverMessage, wss);
            break;
        }
        default: {
            break;
        }
    }
}

function handleUnitMove(origin: AreaType, destination: AreaType, numUnits: number): void {
    const unitMoveController = new UnitMoveController(
        origin,
        destination
    );

    unitMoveController.moveUnits(numUnits);
}