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

    checkForDisconnectedClients() {
        let pingInterval: NodeJS.Timeout | null = setInterval(() => {
            this.clients.forEach((client: any) => {
                this.checkClientHeartbeat(client);
            });
        }, 5000);
    }

    checkClientHeartbeat(ws: any) {
        console.log("checking heartbeat");
        
        const pingInterval = setInterval(() => {
            ws.ping();
        }, 5000);
    
        ws.on('pong', () => {
            // Client responded to the ping, reset the timer
            console.log('Received pong from client');
            clearTimeout(pingTimeout);
            pingTimeout = setTimeout(() => {
                console.log('Client did not respond to ping. Terminating connection.');
                this.removeClient(ws);
                clearInterval(pingInterval);
            }, 10000);
        });
    
        let pingTimeout = setTimeout(() => {
            console.log('Client did not respond to ping. Terminating connection.');
            this.removeClient(ws);
        }, 10000);
    }
}

export const onConnection = (wss: any, webSocketManager: WebSocketManager) => {
    return (ws: any) => {
        webSocketManager.addClient(ws);
        webSocketManager.checkClientHeartbeat(ws);

        ws.on('message', function (data: Buffer) {
            processMessage(data, wss);
        });


        ws.on('close', function () {
            webSocketManager.removeClient(ws);
        })
    }
};

function processMessage(data: Buffer, wss: any) {
    const messageData = parseMessageBuffer(data);
    emitMessage(JSON.stringify(messageData), wss);
}

function parseMessageBuffer(data: Buffer) {
    const str = data.toString();
    return JSON.parse(str);
}

function emitMessage(message: string, wss: any) {
    wss.clients.forEach((client: any) => {
        if (client.readyState === ws.OPEN) {
            client.send(message);
        }
    });
}