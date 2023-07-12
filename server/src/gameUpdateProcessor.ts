import { Areas } from "./gameLogic/Enums/Areas";
import { Area } from "./gameLogic/Models/Area";
import { Game } from "./gameLogic/Models/Game";

enum GameEventType {
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
    GAME_OVER_DISCONNECT = "GAME OVER DISCONNECTION",
    UPDATE_AREA = "UPDATE AREA"
}

type GameEventMessage = {
    id: string,
    type: GameEventType,
    [key: string]: any;
}

export function updateGame(messageData: any, game: Game): GameEventMessage | void {
    switch (messageData.type) {
        case GameEventType.STARTING_REINFORCEMENT: {
            const area = Areas[messageData.areaName];
            const currentPlayer = game.getCurrentPlayer();
            
            if (currentPlayer.getUserID() !== messageData.userID) {
                console.log("message sent from incorrect player");
                return;
            }

            currentPlayer.addReinforcementsToArea(area);
            const areaUpdateMessage = generateAreaUpdateMessage(messageData.id, area);

            return areaUpdateMessage;
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