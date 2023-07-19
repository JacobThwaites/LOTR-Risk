import { AreaType } from "./gameLogic/Models/AreaType";
import { v4 as uuidv4 } from 'uuid';

export type GameEventMessage = {
    id: string,
    type: GameEventType,
    [key: string]: any;
}

export enum GameEventType {
    CLEAR_SELECTED_AREAS = "CLEAR SELECTED AREAS",
    COMBAT = "COMBAT",
    COMBAT_RESULTS = "COMBAT RESULTS",
    STARTING_REINFORCEMENT = "STARTING REINFORCEMENT",
    REINFORCEMENT = "REINFORCEMENT",
    END_TURN = "END TURN",
    UNIT_MOVE_SETUP = "UNIT MOVE SETUP",
    UNIT_MOVE = "UNIT MOVE",
    UNIT_MOVE_COMPLETE = "UNIT MOVE COMPLETE",
    TROOP_TRANSFER_SETUP = "TROOP TRANSFER SETUP",
    TROOP_TRANSFER = "TROOP TRANSFER",
    TROOP_TRANSFER_COMPLETE = "TROOP TRANSFER COMPLETE",
    PLAYER_JOINED = "PLAYER JOINED",
    PLAYER_DISCONNECT = "PLAYER DISCONNECTED",
    GAME_OVER = "GAME OVER",
    GAME_OVER_DISCONNECT = "GAME OVER DISCONNECTION",
    UPDATE_AREA = "UPDATE AREA",
    CHANGE_PLAYER = "CHANGE PLAYER",
    STARTING_REINFORCEMENTS_END = "STARTING REINFORCEMENTS END"
}


export default class GameEventMessageFactory {
    public static generateAreaUpdateMessage(area: AreaType): GameEventMessage {
        return {
            type: GameEventType.UPDATE_AREA,
            id: uuidv4(), 
            areaName: area.getName(),
            areaUnits: area.getUnits(),
            areaColour: area.getPlayer()?.getColour()
        }
    }

    public static generateCombatResultsMessage(attackingArea: AreaType, defendingArea: AreaType): GameEventMessage {
        return {
            type: GameEventType.COMBAT_RESULTS,
            id: uuidv4(), 
            attackingAreaName: attackingArea.getName(),
            attackingAreaUnits: attackingArea.getUnits(),
            attackingAreaColour: attackingArea.getPlayer()?.getColour(),
            defendingAreaName: defendingArea.getName(),
            defendingAreaUnits: defendingArea.getUnits(),
            defendingAreaColour: defendingArea.getPlayer()?.getColour(),
        }
    }

    public static generateChangePlayerMessage(playerColour: string): GameEventMessage {
        return {
            type: GameEventType.CHANGE_PLAYER,
            id: uuidv4(),
            playerColour
        }
    }

    public static generateEndOfStartingReinforcementsMessage(): GameEventMessage {
        return {
            type: GameEventType.STARTING_REINFORCEMENTS_END,
            id: uuidv4()
        }
    }

    public static generateReinforcementUpdateMessage(areaName: string): GameEventMessage {
        return {
            type: GameEventType.REINFORCEMENT,
            id: uuidv4(),
            areaName
        }
    }

    public static generateEndTurnMessage(): GameEventMessage {
        return {
            type: GameEventType.END_TURN,
            id: uuidv4(),
        }
    }

    public static generateGameOverMessage(): GameEventMessage {
        return {
            type: GameEventType.GAME_OVER,
            id: uuidv4(),
        }
    }

    public static generateClearSelectedAreasMessage(): GameEventMessage {
        return {
            type: GameEventType.CLEAR_SELECTED_AREAS,
            id: uuidv4(),
        }
    }
    
    public static generateTroopTransferMessage(): GameEventMessage {
        return {
            type: GameEventType.TROOP_TRANSFER_SETUP,
            id: uuidv4(),
        }
    }

    public static generateUnitMoveSetupMessage(attackingArea: AreaType, defendingArea: AreaType): GameEventMessage {
        return {
            type: GameEventType.UNIT_MOVE_SETUP,
            id: uuidv4(),
            attackingArea: attackingArea.getName(),
            defendingArea: defendingArea.getName()
        }
    }

    public static generateUnitMoveCompleteMessage(): GameEventMessage {
        return {
            type: GameEventType.UNIT_MOVE_COMPLETE,
            id: uuidv4(),
        }
    }

    public static generateTroopTransferCompleteMessage(): GameEventMessage {
        return {
            type: GameEventType.TROOP_TRANSFER_COMPLETE,
            id: uuidv4(),
        }
    }
}