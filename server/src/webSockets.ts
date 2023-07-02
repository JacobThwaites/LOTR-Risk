import { WebSocketServer, WebSocket } from "ws";

const ws = require('ws');

export class WebSocketManager {
    private servers: { [gameID: string]: WebSocketServer };
    private clients: WebSocket[];
    constructor() {
        this.servers = {};
        this.clients = [];
    }

    getServerByGameID(gameID: string) {
        if (this.servers[gameID]) {
            return this.servers[gameID];
        }

        this.servers[gameID] = new ws.Server({ noServer: true });
        return this.servers[gameID];
    }

    addClient(ws: WebSocket) {
        this.clients.push(ws);
    }

    removeClient(ws: WebSocket) {
        ws.close();
        this.clients.splice(this.clients.indexOf(ws), 1);
    }

    checkClientHeartbeat(ws: WebSocket, gameID: string) {
        const pingInterval = setInterval(() => {
            ws.ping();
        }, 5000);

        ws.on('pong', () => {
            clearTimeout(pingTimeout);
            pingTimeout = this.createTimeout(ws, gameID, pingInterval);
        });

        let pingTimeout = this.createTimeout(ws, gameID, pingInterval);
    }

    createTimeout(ws: WebSocket, gameID: string, pingInterval: NodeJS.Timer) {
        return setTimeout(() => {
            this.removeClient(ws);
            this.broadcastPlayerDisconnect(gameID, ws);

            const server = this.getServerByGameID(gameID);
            if (!server.clients.size) {
                this.removeServerByGameID(gameID);
            }

            clearInterval(pingInterval);
        }, 10000);
    }

    broadcastPlayerDisconnect(gameID: string, ws: any): void {
        const server = this.getServerByGameID(gameID);
        const message = { id: 1, type: "PLAYER DISCONNECTED", user: ws };
        emitMessage(JSON.stringify(message), server);
    }

    removeServerByGameID(gameID: string) {
        const wss = this.servers[gameID];
        wss.close();
        delete this.servers[gameID];
    }
}

export const onConnection = (wss: WebSocketServer, webSocketManager: WebSocketManager, gameID: string) => {
    return (ws: WebSocket) => {
        webSocketManager.addClient(ws);
        webSocketManager.checkClientHeartbeat(ws, gameID);

        ws.on('message', function (data: Buffer) {
            processMessage(data, wss);
        });


        ws.on('close', function () {
            webSocketManager.removeClient(ws);
        })
    }
};

function processMessage(data: Buffer, wss: WebSocketServer) {
    const messageData = parseMessageBuffer(data);
    emitMessage(JSON.stringify(messageData), wss);
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