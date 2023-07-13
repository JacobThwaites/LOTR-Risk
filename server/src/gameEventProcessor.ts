import { WebSocketServer } from "ws";
import { Areas } from "./gameLogic/Enums/Areas";
import { Game } from "./gameLogic/Models/Game";
import { emitMessage } from "./webSockets";
import { CombatController } from "./gameLogic/Controllers/CombatController";
import { AreaType } from "./gameLogic/Models/AreaType";
import { UnitManeuverController } from "./gameLogic/Controllers/UnitManeuverController";

export enum GameEventType {
    CLEAR_SELECTED_AREAS = "CLEAR SELECTED AREAS",
    COMBAT_SETUP = "COMBAT SETUP",
    COMBAT = "COMBAT",
    COMBAT_RESULTS = "COMBAT RESULTS",
    STARTING_REINFORCEMENT = "STARTING REINFORCEMENT",
    REINFORCEMENT = "REINFORCEMENT",
    END_TURN = "END TURN",
    UNIT_MOVE_SETUP = "UNIT MANEURVRE SETUP",
    UNIT_MOVE = "UNIT MANEUVRE",
    UNIT_MOVE_COMPLETE = "UNIT MOVE COMPLETE",
    TROOP_TRANSFER_SETUP = "TROOP TRANSFER SETUP",
    TROOP_TRANSFER = "TROOP TRANSFER",
    PLAYER_JOINED = "PLAYER JOINED",
    PLAYER_DISCONNECT = "PLAYER DISCONNECTED",
    GAME_OVER = "GAME OVER",
    GAME_OVER_DISCONNECT = "GAME OVER DISCONNECTION",
    UPDATE_AREA = "UPDATE AREA",
    CHANGE_PLAYER = "CHANGE PLAYER",
    STARTING_REINFORCEMENTS_END = "STARTING REINFORCEMENTS END"
}

export type GameEventMessage = {
    id: string,
    type: GameEventType,
    [key: string]: any;
}

export function updateGame(messageData: any, game: Game, wss: WebSocketServer): void {
    const currentPlayer = game.getCurrentPlayer();
    
    // TODO: re-add once end turn logic is handled
    // if (currentPlayer.getUserID() !== messageData.userID) {
    //     console.log("message sent from incorrect player");
    //     return;
    // }

    switch (messageData.type) {
        case GameEventType.STARTING_REINFORCEMENT: {
            const area = Areas[messageData.areaName];
            currentPlayer.addReinforcementsToArea(area);
            const areaUpdateMessage = generateAreaUpdateMessage(messageData.id, area);

            emitMessage(areaUpdateMessage, wss);

            if (currentPlayer.getReinforcements() < 1) {
                game.changeCurrentPlayer();
                const newCurrentPlayer = game.getCurrentPlayer();
                const changePlayerMessage = generateChangePlayerMessage(messageData.id, newCurrentPlayer.getColour());
                emitMessage(changePlayerMessage, wss);
            }

            if (!game.playersHaveReinforcements()) {
                const endOfStartingReinforcementsMessage = generateEndOfStartingReinforcementsMessage(messageData.id);
                emitMessage(endOfStartingReinforcementsMessage, wss);
            }
            
            break;
        }
        case GameEventType.REINFORCEMENT: {
            const area = Areas[messageData.areaName];
            currentPlayer.addReinforcementsToArea(area);
            const reinforcementUpdateMessage = generateReinforcementUpdateMessage(messageData.id, messageData.areaName);
            emitMessage(reinforcementUpdateMessage, wss);
            break;
        }
        case GameEventType.END_TURN: {
            game.handleNewTurn();
            const endTurnMessage = generateEndTurnMessage(messageData.id);
            emitMessage(endTurnMessage, wss);

            if (game.areMaxTurnsReached()) {
                const gameOverMessage = generateGameOverMessage(messageData.id);
                emitMessage(gameOverMessage, wss);
            }

            break;
        }
        case GameEventType.COMBAT_SETUP: {
            const area = Areas[messageData.areaName];
            currentPlayer.addReinforcementsToArea(area);
            const combatSetupMessage = generateCombatSetupMessage(messageData.id, messageData.attackingArea, messageData.defendingArea);
            emitMessage(combatSetupMessage, wss);
            break;
        }
        case GameEventType.CLEAR_SELECTED_AREAS: {
            const message = generateClearSelectedAreasMessage(messageData.id);
            emitMessage(message, wss);
            break;
        }
        case GameEventType.TROOP_TRANSFER_SETUP: {
            const message = generateTroopTransferMessage(messageData.id);
            emitMessage(message, wss);
            break;
        }
        case GameEventType.PLAYER_JOINED: {
            break;
        }
        case GameEventType.PLAYER_DISCONNECT: {
            break;
        }
        case GameEventType.COMBAT_RESULTS: {
            const attackingArea = Areas[messageData.attackingArea];
            const defendingArea = Areas[messageData.defendingArea];
            const combatController = new CombatController(
                messageData.attackingArea,
                messageData.defendingArea,
                game!
            );
            const results = combatController.getCombatResults(messageData.numAttackingDice);
            combatController.handleResults(results);

            const attackingAreaUpdateMessage = generateAreaUpdateMessage(messageData.id, attackingArea);
            const defendingAreaUpdateMessage = generateAreaUpdateMessage(messageData.id, defendingArea);
            emitMessage(attackingAreaUpdateMessage, wss);
            emitMessage(defendingAreaUpdateMessage, wss);

            if (defendingArea.hasNoUnitsRemaining()) {
                const message = generateUnitMoveSetupMessage(messageData.id, attackingArea, defendingArea);
                emitMessage(message, wss);
            }
            break;
        }
        case GameEventType.UNIT_MOVE: {
            const origin = Areas[messageData.origin];
            const destination = Areas[messageData.destination];
            handleUnitMove(origin, destination, messageData.numUnits);

            const originUpdateMessage = generateAreaUpdateMessage(messageData.id, origin);
            const destinationUpdateMessage = generateAreaUpdateMessage(messageData.id, destination);
            emitMessage(originUpdateMessage, wss);
            emitMessage(destinationUpdateMessage, wss);

            const unitMoveCompleteMessage = generateUnitMoveCompleteMessage(messageData.id);
            emitMessage(unitMoveCompleteMessage, wss);
            break;
        }
        case GameEventType.TROOP_TRANSFER: {
            const origin = Areas[messageData.origin];
            const destination = Areas[messageData.destination];
            handleUnitMove(origin, destination, messageData.numUnits);

            const originUpdateMessage = generateAreaUpdateMessage(messageData.id, origin);
            const destinationUpdateMessage = generateAreaUpdateMessage(messageData.id, destination);
            emitMessage(originUpdateMessage, wss);
            emitMessage(destinationUpdateMessage, wss);
            break;
        }
        case GameEventType.GAME_OVER_DISCONNECT: {
            break;
        }
        default: {
            break;
        }
    }
}

function generateAreaUpdateMessage(id: string, area: AreaType): GameEventMessage {
    return {
        type: GameEventType.UPDATE_AREA,
        id, 
        areaName: area.getName(),
        areaUnits: area.getUnits(),
        areaColour: area.getPlayer()?.getColour()
    }
}

function generateChangePlayerMessage(id: string, playerColour: string): GameEventMessage {
    return {
        type: GameEventType.CHANGE_PLAYER,
        id,
        playerColour
    }
}

function generateEndOfStartingReinforcementsMessage(id: string): GameEventMessage {
    return {
        type: GameEventType.STARTING_REINFORCEMENTS_END,
        id
    }
}

function generateReinforcementUpdateMessage(id: string, areaName: string): GameEventMessage {
    return {
        type: GameEventType.REINFORCEMENT,
        id,
        areaName
    }
}

function generateEndTurnMessage(id: string): GameEventMessage {
    return {
        type: GameEventType.END_TURN,
        id
    }
}

function generateGameOverMessage(id: string): GameEventMessage {
    return {
        type: GameEventType.GAME_OVER,
        id
    }
}

function generateCombatSetupMessage(id: string, attackingAreaName: string, defendingAreaName: string): GameEventMessage {
    return {
        type: GameEventType.COMBAT_SETUP,
        id,
        attackingAreaName,
        defendingAreaName
    }
}

function generateClearSelectedAreasMessage(id: string): GameEventMessage {
    return {
        type: GameEventType.CLEAR_SELECTED_AREAS,
        id
    }
}

function generateTroopTransferMessage(id: string): GameEventMessage {
    return {
        type: GameEventType.TROOP_TRANSFER_SETUP,
        id
    }
}

function generateUnitMoveSetupMessage(id: string, attackingArea: AreaType, defendingArea: AreaType): GameEventMessage {
    return {
        type: GameEventType.UNIT_MOVE_SETUP,
        id,
        attackingAreaName: attackingArea.getName(),
        defendingAreaName: defendingArea.getName()
    }
}

function generateUnitMoveCompleteMessage(id: string): GameEventMessage {
    return {
        type: GameEventType.UNIT_MOVE_COMPLETE,
        id
    }
}

function handleUnitMove(origin: AreaType, destination: AreaType, numUnits: number): void {
    const unitManeuverController = new UnitManeuverController(
        origin,
        destination
    );

    unitManeuverController.moveUnits(numUnits);
}