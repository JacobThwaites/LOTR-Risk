import { v4 as uuidv4 } from 'uuid';
import { getUserID } from './userIDManager';

export enum GameEventType {
    CLEAR_SELECTED_AREAS = "CLEAR SELECTED AREAS",
    COMBAT_SETUP = "COMBAT SETUP",
    COMBAT_RESULTS = "COMBAT RESULTS",
    STARTING_REINFORCEMENT = "STARTING REINFORCEMENT",
    REINFORCEMENT = "REINFORCEMENT",
    END_TURN = "END TURN",
    UNIT_MOVE = "UNIT MANEUVRE",
    TROOP_TRANSFER_SETUP = "TROOP TRANSFER SETUP",
    TROOP_TRANSFER = "TROOP TRANSFER",
    PLAYER_JOINED = "PLAYER JOINED",
    PLAYER_DISCONNECT = "PLAYER DISCONNECTED",
    GAME_OVER_DISCONNECT = "GAME OVER DISCONNECTION"
}

export default class WebSocketHandler {
    gameID: string;
    socket: WebSocket;
    previousMessageUUID: string;

    constructor(gameID: string, socket: WebSocket) {
        this.gameID = gameID;
        this.socket = socket;
        this.previousMessageUUID = '';
    }

    closeSocket() {
        this.socket.close();
    }

    // TODO: this won't be needed once new backend approach is implemented
    isMessageAlreadyProcessed(messageUUID: string): boolean {
        return messageUUID === this.previousMessageUUID;
    }   

    sendMessage(message: any): void {
        message.id = uuidv4(); 
        message.userID = getUserID();
        this.socket.send(JSON.stringify(message));
    }

    sendCombatInfo(attackingArea: string, defendingArea: string) {
        const messageBody = {
            type: GameEventType.COMBAT_SETUP,
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

    sendReinforcement(areaName: string) {
        const messageBody = {
            type: GameEventType.REINFORCEMENT,
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

    sendUnitMove(origin: string, destination: string, numUnits: number) {
        const messageBody = {
            type: GameEventType.UNIT_MOVE,
            origin,
            destination,
            numUnits 
        }

        this.sendMessage(messageBody);
    }

    sendTroopTransferSetup() {
        const messageBody = {
            type: GameEventType.TROOP_TRANSFER_SETUP
        };

        this.sendMessage(messageBody);
    }

    sendTroopTransfer(origin: string, destination: string, numUnits: number) {
        const messageBody = {
            type: GameEventType.TROOP_TRANSFER,
            origin,
            destination,
            numUnits 
        }

        this.sendMessage(messageBody);
    }

    sendPlayerJoinedNotification() {     
        const messageBody = {
            type: GameEventType.PLAYER_JOINED,
            userID: getUserID()
        }

        this.sendMessage(messageBody);
    }
}
