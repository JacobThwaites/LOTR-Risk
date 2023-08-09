import { getUserID } from './userIDManager';
import { AreaName } from '../gameLogic/Enums/AreaNames';
import { TerritoryCard } from '../gameLogic/Models/TerritoryCard';
import { sendMessage } from './sendWebSocketMessage';

export enum GameEventType {
    CLEAR_SELECTED_AREAS = "CLEAR SELECTED AREAS",
    COMBAT = "COMBAT",
    COMBAT_RESULTS = "COMBAT RESULTS",
    STARTING_REINFORCEMENT = "STARTING REINFORCEMENT",
    REINFORCEMENT = "REINFORCEMENT",
    REINFORCEMENTS_AVAILABLE = "REINFORCEMENTS AVAILABLE",
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
    STARTING_REINFORCEMENTS_END = "STARTING REINFORCEMENTS END",
    TERRITORY_CARDS = "TERRITORY CARDS",
    TRADE_TERRITORY_CARDS = "TRADE TERRITORY CARDS",
    LEADERBOARD_UPDATE = "LEADERBOARD UPDATE"
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

    sendCombatResults(attackingArea: string, defendingArea: string, results: string[]) {
        const messageBody = {
            type: GameEventType.COMBAT_RESULTS,
            attackingArea,
            defendingArea,
            results
        }

        sendMessage(messageBody, this.socket);
    }

    sendClearAreaSelection() {
        const messageBody = {
            type: GameEventType.CLEAR_SELECTED_AREAS
        }

        sendMessage(messageBody, this.socket);
    }

    sendStartingReinforcement(areaName: string) {
        const messageBody = {
            type: GameEventType.STARTING_REINFORCEMENT,
            areaName
        }

        sendMessage(messageBody, this.socket);
    }

    sendReinforcement(areaName: string) {
        const messageBody = {
            type: GameEventType.REINFORCEMENT,
            areaName
        }

        sendMessage(messageBody, this.socket);
    }

    sendEndTurn() {
        const messageBody = {
            type: GameEventType.END_TURN
        }

        sendMessage(messageBody, this.socket);
    }

    sendUnitMove(origin: string, destination: string, numUnits: number) {
        const messageBody = {
            type: GameEventType.UNIT_MOVE,
            origin,
            destination,
            numUnits 
        }

        sendMessage(messageBody, this.socket);
    }

    sendTroopTransferSetup() {
        const messageBody = {
            type: GameEventType.TROOP_TRANSFER_SETUP
        };

        sendMessage(messageBody, this.socket);
    }

    sendTroopTransfer(origin: string, destination: string, numUnits: number) {
        const messageBody = {
            type: GameEventType.TROOP_TRANSFER,
            origin,
            destination,
            numUnits 
        }

        sendMessage(messageBody, this.socket);
    }

    sendPlayerJoinedNotification() {     
        const messageBody = {
            type: GameEventType.PLAYER_JOINED,
            userID: getUserID()
        }

        sendMessage(messageBody, this.socket);
    }

    sendCombat(attackingArea: AreaName, defendingArea: AreaName, numAttackingDice: number) {     
        const messageBody = {
            type: GameEventType.COMBAT,
            userID: getUserID(),
            attackingArea,
            defendingArea,
            numAttackingDice
        }

        sendMessage(messageBody, this.socket);
    }

    sendTradeTerritoryCards(territoryCards: TerritoryCard[]): void {
        const messageBody = {
            type: GameEventType.TRADE_TERRITORY_CARDS,
            territoryCards,
            userID: getUserID(),
        }
        
        sendMessage(messageBody, this.socket);
    }
}
