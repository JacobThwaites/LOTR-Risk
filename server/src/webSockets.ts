const WebSocket = require('ws');

export class WebSocketServerManager {
    servers: any;
    constructor() {
        this.servers = {};
    }

    getServerByGameID(gameID: string) {
        if (this.servers[gameID]) {
            return this.servers[gameID];
        }

        this.servers[gameID] = new WebSocket.Server({ noServer: true });
        return this.servers[gameID];
    }
}


export const onConnection = (gameID: string, wss: any) => {
    console.log('onConnection called');
    return (ws: any, upgradeReq: any) => {
        ws.on('message', function (data: Buffer) {
            const str = data.toString();
            const messageData = JSON.parse(str);
            emitMessage(JSON.stringify(messageData), wss);
        });
    }
};

function emitMessage(message: string, wss: any) {
    wss.clients.forEach((client: any) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}
