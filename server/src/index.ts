import express from 'express';
import * as games from './games';
import * as players from './players';
import { WebSocketManager, onConnection } from './webSockets';
import setupDatabase from './database/dbSetup';
import { enableCORS } from './cors';
import { parse } from 'url';

setupDatabase();

const app = express();
const http = require('http');
const server = http.createServer(app);


const HTTP_PORT = 8000;
const WEBSOCKETS_PORT = 8001;

// Web Sockets

const webSocketManager = new WebSocketManager();

server.on('upgrade', function (request: any, socket: any, head: any) {
    const { pathname } = parse(request.url);

    if (!pathname) {
        return;
    }

    const gameID = pathname.substring(pathname.length - 8);
    const wss = webSocketManager.getServerByGameID(gameID);

    wss.handleUpgrade(request, socket, head, function (ws: any) {
        wss.emit('connection', ws, request);
    });
});

app.use('/api/game/:gameID', (req: any, res, next) => {
    const { gameID } = req.params;
    const wss = webSocketManager.getServerByGameID(gameID);
    wss.on('connection', onConnection(wss, webSocketManager));
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
app.get('/api/game', games.allGames);
app.get("/api/game/:uuid", games.getGameByUUID);
app.post("/api/game/", games.createGame);

// Player
app.get('/api/player', players.allPlayers);
app.get('/api/player/:id', players.getPlayerById);
app.patch('/api/player/:id', players.updatePlayer);
app.post("/api/player/", players.createPlayer);

// Default response for any other request
app.use(function (_req: express.Request, res: express.Response) {
    res.status(404);
});

module.exports = app;