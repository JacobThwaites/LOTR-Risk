import express from 'express';
import * as games from './games';
import { onConnection } from './webSockets';
import { enableCORS } from './cors';
import { WebSocketManager } from './WebSocketManager';
import { makeWebSocketServer } from './makeWebSocketServer';

const app = express();
const http = require('http');


const HTTP_PORT = 8000;
const WEBSOCKETS_PORT = 8001;

// Web Sockets

const webSocketManager = new WebSocketManager();
const server = makeWebSocketServer(app, webSocketManager);


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