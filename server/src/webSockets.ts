const ws = require('ws');

export class WebSocketManager {
    private servers: any;
    private clients: any;
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

    addClient(ws: any) {
        this.clients.push(ws);
    }

    removeClient(ws: any) {
        ws.close();
        this.clients.splice(this.clients.indexOf(ws), 1);
    }
}


export const onConnection = (wss: any, webSocketManager: WebSocketManager) => {
    return (ws: any) => {
        webSocketManager.addClient(ws);

        ws.on('message', function (data: Buffer) {
            const str = data.toString();
            const messageData = JSON.parse(str);
            emitMessage(JSON.stringify(messageData), wss);
        });

        ws.on('close', function() {
            webSocketManager.removeClient(ws);
            ws.close();
        })
    }
};

function emitMessage(message: string, wss: any) {
    wss.clients.forEach((client: any) => {
        if (client.readyState === ws.OPEN) {
            client.send(message);
        }
    });
}
