import { v4 as uuidv4 } from 'uuid';


export enum GameEventType {
    CLEAR_SELECTED_AREAS = "CLEAR SELECTED AREAS",
    COMBAT = "COMBAT",
    COMBAT_RESULTS = "COMBAT RESULTS",
    STARTING_REINFORCEMENT = "STARTING REINFORCEMENT",
    END_TURN = "END TURN",
    UNIT_MANEURVRE = "UNIT MANEUVRE",
    PLAYER_JOINED = "PLAYER JOINED",
}

export default class WebSocketHandler {
    gameID: string;
    socket: any;
    previousMessageUUID: string;

    constructor(gameID: string) {
        this.gameID = gameID;
        this.socket = new WebSocket(`ws://localhost:8001/api/game/${gameID}`);
        this.previousMessageUUID = '';
    }

    isMessageAlreadyProcessed(messageUUID: string): boolean {
        return messageUUID === this.previousMessageUUID;
    }   

    sendMessage(message: any) {
        message.id = uuidv4(); 
        this.socket.send(JSON.stringify(message));
    }

    sendCombatInfo(attackingArea: string, defendingArea: string) {
        const messageBody = {
            type: GameEventType.COMBAT,
            attackingArea,
            defendingArea
        }

        this.sendMessage(messageBody);
    }

    sendCombatResults(attackingArea: string, defendingArea: string, results: string[]) {
        const messageBody = {
            type: GameEventType.COMBAT_RESULTS,
            attackingArea,
            defendingArea,
            results
        }

        this.sendMessage(messageBody);
    }

    sendClearAreaSelection() {
        const messageBody = {
            type: GameEventType.CLEAR_SELECTED_AREAS
        }

        this.sendMessage(messageBody);
    }

    sendStartingReinforcement(areaName: string) {
        const messageBody = {
            type: GameEventType.STARTING_REINFORCEMENT,
            areaName
        }

        this.sendMessage(messageBody);
    }

    sendEndTurn() {
        const messageBody = {
            type: GameEventType.END_TURN
        }

        this.sendMessage(messageBody);
    }

    sendUnitManeuvre(areaToMoveUnits: string, areaToReceiveUnits: string, numUnits: number) {
        const messageBody = {
            type: GameEventType.UNIT_MANEURVRE,
            areaToMoveUnits,
            areaToReceiveUnits,
            numUnits 
        }

        this.sendMessage(messageBody);
    }

    sendPlayerJoinedNotification() {
        const messageBody = {
            type: GameEventType.PLAYER_JOINED
        }

        this.sendMessage(messageBody);
    }
}
