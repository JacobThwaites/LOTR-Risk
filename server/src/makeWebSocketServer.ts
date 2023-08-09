import { WebSocketManager } from './WebSocketManager';
import http, { IncomingMessage } from 'http';
import { parse } from 'url';

export function makeWebSocketServer(app: any, webSocketManager: WebSocketManager): http.Server {
    const server = http.createServer(app);

    server.on('upgrade', function (request: IncomingMessage, socket: any, head: Buffer) {
        const { pathname } = parse(request.url!);
    
        if (!pathname) {
            return;
        }
    
        const gameID = pathname.substring(pathname.length - 8);
        const wss = webSocketManager.getGameServer(gameID);
    
        wss.handleUpgrade(request, socket, head, function (ws: any) {
            wss.emit('connection', ws, request);
        });
    });

    return server;
};