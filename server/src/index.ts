import express from 'express';
import cors from 'cors';
import * as games from './games';
import * as players from './players';
import * as webSockets from './webSockets';
import setupDatabase from './database/dbSetup';

setupDatabase();

const app = express();
const http = require('http');
const server = http.createServer(app);


// Web Sockets
const WebSocket = require('ws');
export const wss = new WebSocket.Server({ server });

app.use('/api/game/:gameID', (req: any, res, next) => {
    const { gameID } = req.params;
    wss.on('connection', webSockets.onConnection(gameID));
    next();
});


//   REST API
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// enable cors to the server
const corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
    allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work.

const HTTP_PORT = 8000;
const WEBSOCKETS_PORT = 8001;

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
app.post("/api/player/", players.createPlayer);

// Default response for any other request
app.use(function (_req: express.Request, res: express.Response) {
    res.status(404);
});

module.exports = app;