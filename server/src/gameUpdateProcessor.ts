import { WebSocketServer } from "ws";
import { Areas } from "./gameLogic/Enums/Areas";
import { Area } from "./gameLogic/Models/Area";
import { Game } from "./gameLogic/Models/Game";
import { emitMessage } from "./webSockets";

export enum GameEventType {
    CLEAR_SELECTED_AREAS = "CLEAR SELECTED AREAS",
    COMBAT = "COMBAT",
    COMBAT_RESULTS = "COMBAT RESULTS",
    STARTING_REINFORCEMENT = "STARTING REINFORCEMENT",
    REINFORCEMENT = "REINFORCEMENT",
    END_TURN = "END TURN",
    UNIT_MANEURVRE = "UNIT MANEUVRE",
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
        }
        case GameEventType.END_TURN: {
            game.handleNewTurn();
            const endTurnMessage = generateEndTurnMessage(messageData.id);
            emitMessage(endTurnMessage, wss);

            if (game.areMaxTurnsReached()) {
                const gameOverMessage = generateGameOverMessage(messageData.id);
                emitMessage(gameOverMessage, wss);
            }
        }
        default: {
            break;
        }
    }
}

function generateAreaUpdateMessage(id: string, area: Area): GameEventMessage {
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

function generateEndTurnMessage(id: string) {
    return {
        type: GameEventType.END_TURN,
        id
    }
}

function generateGameOverMessage(id: string) {
    return {
        type: GameEventType.GAME_OVER,
        id
    }
}