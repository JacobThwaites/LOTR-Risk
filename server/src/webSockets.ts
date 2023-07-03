import { WebSocketServer, WebSocket } from "ws";
import WebSocketWithID from "./WebSocketWithID";
const ws = require('ws');

export class WebSocketManager {
    private servers: { [gameID: string]: WebSocketServer };
    private clients: { [gameID: string]: { [userID: string]: WebSocket } };
    constructor() {
        this.servers = {};
        this.clients = {};
    }

    getGameServer(gameID: string) {
        if (this.servers[gameID]) {
            return this.servers[gameID];
        }

        this.servers[gameID] = new ws.Server({ noServer: true });
        this.clients[gameID] = {};
        return this.servers[gameID];
    }

    addClient(gameID: string, ws: WebSocketWithID) {
        this.clients[gameID][ws.getID()] = ws.getWebSocketInstance();
    }

    removeClient(webSocketWithID: WebSocketWithID, gameID: string): void {
        webSocketWithID.getWebSocketInstance().close();
        delete this.clients[gameID][webSocketWithID.getID()];
    }

    checkClientHeartbeat(webSocketWithID: WebSocketWithID, gameID: string) {
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

    createHeartbeatTimeout(webSocketWithID: WebSocketWithID, gameID: string, pingInterval: NodeJS.Timer) {
        return setTimeout(() => {
            this.broadcastPlayerDisconnect(gameID, webSocketWithID);
            this.removeClient(webSocketWithID, gameID);

            const server = this.getGameServer(gameID);
            if (!server.clients.size) {
                this.removeGameServer(gameID);
            }

            clearInterval(pingInterval);
        }, 10000);
    }

    broadcastPlayerDisconnect(gameID: string, webSocketWithID: WebSocketWithID): void {
        const server = this.getGameServer(gameID);
        const message = { id: 1, type: "PLAYER DISCONNECTED", user: webSocketWithID.getID() };
        emitMessage(JSON.stringify(message), server);
    }

    removeGameServer(gameID: string) {
        const wss = this.servers[gameID];
        wss.close();
        delete this.servers[gameID];
        delete this.clients[gameID];
    }
}

export const onConnection = (wss: WebSocketServer, webSocketManager: WebSocketManager, gameID: string) => {
    return (ws: WebSocket) => {
        const webSocketWithID = new WebSocketWithID(ws);
        webSocketManager.checkClientHeartbeat(webSocketWithID, gameID);

        ws.on('message', function (data: Buffer) {
            const messageData = processMessage(data, wss);

            if (messageData.type === 'PLAYER JOINED') {
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