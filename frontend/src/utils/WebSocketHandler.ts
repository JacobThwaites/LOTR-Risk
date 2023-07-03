import { v4 as uuidv4 } from 'uuid';


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
    PLAYER_DISCONNECTED = "PLAYER DISCONNECTED",
    PLAYER_RECONNECTED = "PLAYER RECONNECTED",
    GAME_OVER_DISCONNECT = "GAME OVER DISCONNECTION"
}

export default class WebSocketHandler {
    gameID: string;
    socket: any;
    previousMessageUUID: string;

    constructor(gameID: string, socket: WebSocket) {
        this.gameID = gameID;
        this.socket = socket;
        this.previousMessageUUID = '';
    }

    closeSocket() {
        this.socket.close();
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

    sendUnitManeuvre(areaToMoveUnits: string, areaToReceiveUnits: string, numUnits: number) {
        const messageBody = {
            type: GameEventType.UNIT_MANEURVRE,
            areaToMoveUnits,
            areaToReceiveUnits,
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

    sendTroopTransfer(areaToMoveUnits: string, areaToReceiveUnits: string, numUnits: number) {
        const messageBody = {
            type: GameEventType.TROOP_TRANSFER,
            areaToMoveUnits,
            areaToReceiveUnits,
            numUnits 
        }

        this.sendMessage(messageBody);
    }

    sendPlayerJoinedNotification(userID: string) {
        const messageBody = {
            type: GameEventType.PLAYER_JOINED,
            userID
        }

        this.sendMessage(messageBody);
    }

    sendPlayerReconnected(userID: string) {
        const messageBody = {
            type: GameEventType.PLAYER_RECONNECTED,
            userID
        }

        this.sendMessage(messageBody);
    }
}
