import { WebSocketServer, WebSocket } from "ws";
import WebSocketWithID from "./WebSocketWithID";
import PlayerDisconnectionTracker from "./PlayerDisconnectionTracker";
import { countdownManager } from "./CountdownManager";

import { v4 as uuidv4 } from 'uuid';
const ws = require('ws');

export class WebSocketManager {
    private servers: { [gameID: string]: WebSocketServer };
    private clients: { [gameID: string]: { [userID: string]: WebSocket } };
    constructor() {
        this.servers = {};
        this.clients = {};
    }

    public getGameServer(gameID: string) {
        if (this.servers[gameID]) {
            return this.servers[gameID];
        }

        this.servers[gameID] = new ws.Server({ noServer: true });
        this.clients[gameID] = {};
        return this.servers[gameID];
    }

    public addClient(gameID: string, ws: WebSocketWithID) {
        this.clients[gameID][ws.getID()] = ws.getWebSocketInstance();
    }

    public removeClient(webSocketWithID: WebSocketWithID, gameID: string): void {
        webSocketWithID.getWebSocketInstance().close();
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

    broadcastPlayerDisconnect(gameID: string, webSocketWithID: WebSocketWithID): void {
        const server = this.getGameServer(gameID);
        const message = { id: uuidv4(), type: "PLAYER DISCONNECTED", user: webSocketWithID.getID() };
        emitMessage(JSON.stringify(message), server);
    }

    removeGameServer(gameID: string) {
        const wss = this.servers[gameID];
        wss.close();
        delete this.servers[gameID];
        delete this.clients[gameID];
    }

    startDisconnectTimeout(userID: string, gameID: string): void {
        const disconnectionTracker = new PlayerDisconnectionTracker(() => this.onUserTimeout(userID, gameID));
        disconnectionTracker.startDisconnectionCountdown();
    }

    onUserTimeout(userID: string, gameID: string) {
        const server = this.getGameServer(gameID);
        const message = { id: uuidv4(), type: "GAME OVER DISCONNECTION", userID };
        emitMessage(JSON.stringify(message), server);
    }

    onPlayerReconnect(userID: string) {
        countdownManager.cancelCountdown(userID);
    }
}

export const onConnection = (wss: WebSocketServer, webSocketManager: WebSocketManager, gameID: string) => {
    return (ws: WebSocket) => {
        const webSocketWithID = new WebSocketWithID(ws);
        webSocketManager.checkClientHeartbeat(webSocketWithID, gameID);

        ws.on('message', function (data: Buffer) {
            const messageData = processMessage(data, wss);
            
            if (messageData.type === 'PLAYER JOINED') {
                if (webSocketManager.isUserAlreadyInGame(messageData.userID, gameID)) {
                    webSocketManager.removeClient(webSocketWithID, gameID);
                    webSocketManager.onPlayerReconnect(messageData.userID);
                }
                webSocketWithID.setID(messageData.userID);
                webSocketManager.addClient(gameID, webSocketWithID);
            }
        });

        ws.on('close', function () {
            webSocketManager.removeClient(webSocketWithID, gameID);
        })
    }
};

function processMessage(data: Buffer, wss: WebSocketServer) {
    const messageData = parseMessageBuffer(data);
    emitMessage(JSON.stringify(messageData), wss);
    return messageData;
}

function parseMessageBuffer(data: Buffer) {
    const str = data.toString();
    return JSON.parse(str);
}

function emitMessage(message: string, wss: WebSocketServer) {
    wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === ws.OPEN) {
            client.send(message);
        }
    });
}