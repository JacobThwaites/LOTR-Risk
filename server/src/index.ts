import express from 'express';
import * as games from './games';
import { onConnection } from './webSockets';
import setupDatabase from './data/dbSetup';
import { WebSocket } from 'ws';
import { enableCORS } from './cors';
import { parse } from 'url';
import { IncomingMessage } from 'http';
import { WebSocketManager } from './WebSocketManager';

setupDatabase();

const app = express();
const http = require('http');
const server = http.createServer(app);


const HTTP_PORT = 8000;
const WEBSOCKETS_PORT = 8001;

// Web Sockets

const webSocketManager = new WebSocketManager();

server.on('upgrade', function (request: IncomingMessage, socket: any, head: Buffer) {
    const { pathname } = parse(request.url!);

    if (!pathname) {
        return;
    }

    const gameID = pathname.substring(pathname.length - 8);
    const wss = webSocketManager.getGameServer(gameID);

    wss.handleUpgrade(request, socket, head, function (ws: WebSocket) {
        wss.emit('connection', ws, request);
    });
});

app.use('/api/game/:gameID', (req: any, res, next) => {
    const { gameID } = req.params;
    const wss = webSocketManager.getGameServer(gameID);
    wss.on('connection', onConnection(wss, webSocketManager, gameID));
    next();
});


//   REST API
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


enableCORS(app);

if (process.env.NODE_ENV !== 'test') {
    app.listen(HTTP_PORT, () => {
        console.log(`Server running on port ${HTTP_PORT}`);
    });

    server.listen(WEBSOCKETS_PORT, () => {
        console.log(`Websockets listening on port ${WEBSOCKETS_PORT}`);
    });
}


// API Routes

// Game 
app.get("/api/game/:uuid", games.getGameByUUID);
app.post("/api/game/", games.createGame);
app.patch('/api/game/:uuid', games.addUserToGame);

// Default response for any other request
app.use(function (_req: express.Request, res: express.Response) {
    res.status(404);
});

module.exports = app;