import { WebSocketServer, WebSocket } from "ws";
import { countdownManager } from "./CountdownManager";
import { v4 as uuidv4 } from 'uuid';
import WebSocketWithID from "./WebSocketWithID";
import PlayerDisconnectionTracker from "./PlayerDisconnectionTracker";
import { emitMessage } from "./webSockets";
import { GameEventType } from "./GameEventMessageFactory";
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

    public addClient(gameID: string, ws: WebSocketWithID) {
        this.clients[gameID][ws.getID()] = ws.getWebSocketInstance();
    }

    public removeClient(webSocketWithID: WebSocketWithID, gameID: string): void {
        webSocketWithID.getWebSocketInstance().close();
        console.log("removing client");
        delete this.clients[gameID][webSocketWithID.getID()];
    }

    public isUserAlreadyInGame(userID: string, gameID: string): boolean {
        return this.clients[gameID].hasOwnProperty(userID);
    }

    public checkClientHeartbeat(webSocketWithID: WebSocketWithID, gameID: string) {
        const ws = webSocketWithID.getWebSocketInstance();
        const pingInterval = setInterval(() => {
            ws.ping();
        }, 5000);

        ws.on('pong', () => {
            clearTimeout(pingTimeout);
            pingTimeout = this.createHeartbeatTimeout(webSocketWithID, gameID, pingInterval);
        });

        let pingTimeout = this.createHeartbeatTimeout(webSocketWithID, gameID, pingInterval);
    }

    private createHeartbeatTimeout(webSocketWithID: WebSocketWithID, gameID: string, pingInterval: NodeJS.Timer) {
        return setTimeout(() => {
            this.broadcastPlayerDisconnect(gameID, webSocketWithID);
            this.removeClient(webSocketWithID, gameID);
            this.startDisconnectTimeout(webSocketWithID.getID(), gameID);

            const server = this.getGameServer(gameID);
            if (!server.clients.size) {
                this.removeGameServer(gameID);
            }

            clearInterval(pingInterval);
        }, 10000);
    }

    private broadcastPlayerDisconnect(gameID: string, webSocketWithID: WebSocketWithID): void {
        const server = this.getGameServer(gameID);
        // TODO: get user colour and send that in message
        const message = { id: uuidv4(), type: GameEventType.PLAYER_DISCONNECT, userColour: webSocketWithID.getID() };
        emitMessage(message, server);
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
        emitMessage(message, server);
    }
}