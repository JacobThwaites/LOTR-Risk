import { WebSocketServer, WebSocket } from "ws";
import { countdownManager } from "./CountdownManager";
import { v4 as uuidv4 } from 'uuid';
import WebSocketWithUserID from "./WebSocketWithUserID";
import PlayerDisconnectionTracker from "./PlayerDisconnectionTracker";
import { broadcastMessage } from "./webSockets";
import GameEventMessageFactory, { GameEventMessage, GameEventType } from "./GameEventMessageFactory";
import { activeGames } from "./data/ActiveGames";
import { Player } from "./gameLogic/Models/Player";
const ws = require('ws');

export class WebSocketManager {
    private servers: { [gameID: string]: WebSocketServer };
    private clients: { [gameID: string]: { [userID: string]: WebSocket } };
    private previousMessageID: string;
    constructor() {
        this.servers = {};
        this.clients = {};
        this.previousMessageID = '';
    }

    public isMessageAlreadyProcessed(messageData: {[id: string]: string}): boolean {
        return messageData.id === this.previousMessageID;
    }
    
    public setPreviousMessageID(messageID: string): void {
        this.previousMessageID = messageID;
    }

    public getGameServer(gameID: string) {
        if (this.servers[gameID]) {
            return this.servers[gameID];
        }

        this.servers[gameID] = new ws.Server({ noServer: true });
        this.clients[gameID] = {};
        return this.servers[gameID];
    }

    public onPlayerReconnect(userID: string) {
        countdownManager.cancelCountdown(userID);
    }

    public addClient(gameID: string, ws: WebSocketWithUserID) {
        this.clients[gameID][ws.getID()] = ws.getWebSocketInstance();
    }

    public removeClient(webSocketWithUserID: WebSocketWithUserID, gameID: string): void {
        webSocketWithUserID.getWebSocketInstance().close();
        delete this.clients[gameID][webSocketWithUserID.getID()];
    }

    public messageIndividualClient(gameID: string, userID: string, messageData: GameEventMessage): void {
        const gameClients = this.clients[gameID];
        if (!gameClients) {
            return;
        }

        const client = gameClients[userID];

        if (!client) {
            return;
        }

        client.send(JSON.stringify(messageData));
    }

    public isUserAlreadyInGame(userID: string, gameID: string): boolean {
        return this.clients[gameID].hasOwnProperty(userID);
    }

    public checkClientHeartbeat(webSocketWithUserID: WebSocketWithUserID, gameID: string) {
    const ws = webSocketWithUserID.getWebSocketInstance();
        const pingInterval = setInterval(() => {
            ws.ping();
        }, 5000);

        ws.on('pong', () => {
            clearTimeout(pingTimeout);
            pingTimeout = this.createHeartbeatTimeout(webSocketWithUserID, gameID, pingInterval);
        });

        let pingTimeout = this.createHeartbeatTimeout(webSocketWithUserID, gameID, pingInterval);
    }

    private createHeartbeatTimeout(webSocketWithUserID: WebSocketWithUserID, gameID: string, pingInterval: NodeJS.Timer) {
        return setTimeout(() => {
            this.handleUserDisconnection(webSocketWithUserID, gameID);

            clearInterval(pingInterval);
        }, 10000);
    }

    private handleUserDisconnection(webSocketWithUserID: WebSocketWithUserID, gameID: string) {
        if (activeGames.hasGameStarted(gameID)) {
            this.startDisconnectTimeout(webSocketWithUserID.getID(), gameID);
        } else {
            const userID = webSocketWithUserID.getID();
            activeGames.removeUserIDFromGame(userID, gameID);
        }
        
        this.broadcastPlayerDisconnect(gameID, webSocketWithUserID);
        this.removeClient(webSocketWithUserID, gameID);
        const server = this.getGameServer(gameID);
        if (!server.clients.size) {
            this.removeGameServer(gameID);
            activeGames.deleteGame(gameID);
        }
    }

    private broadcastPlayerDisconnect(gameID: string, webSocketWithUserID: WebSocketWithUserID): void {
        const game = activeGames.getGameByID(gameID);
        const server = this.getGameServer(gameID);
        const disconnectedPlayer = this.getDisconnectedPlayer(gameID, webSocketWithUserID);
        const disconnectionMessage = GameEventMessageFactory.generatePlayerDisconnectMessage(disconnectedPlayer?.getColour(), game);
        broadcastMessage(disconnectionMessage, server);
    }

    private getDisconnectedPlayer(gameID: string, webSocketWithUserID: WebSocketWithUserID): Player | null {
        const userID = webSocketWithUserID.getID();
        return activeGames.getPlayerByUserID(gameID, userID);
    }

    private removeGameServer(gameID: string) {
        const wss = this.servers[gameID];
        wss.close();
        delete this.servers[gameID];
        delete this.clients[gameID];
    }

    private startDisconnectTimeout(userID: string, gameID: string): void {
        const disconnectionTracker = new PlayerDisconnectionTracker(() => this.onUserTimeout(userID, gameID));
        disconnectionTracker.startDisconnectionCountdown();
    }

    private onUserTimeout(userID: string, gameID: string) {
        const server = this.getGameServer(gameID);
        const message = { id: uuidv4(), type: GameEventType.GAME_OVER_DISCONNECT, userID };
        broadcastMessage(message, server);
    }
}