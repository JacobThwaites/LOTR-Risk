import express from 'express';
import cors from 'cors';
import * as games from './games';
import * as players from './players';
import { WSClientList } from './WSClientList';

// Web Sockets
const http = require('http');
const app = express()

const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const connectedUsers = new Map<string, number>();
const clientsList = new WSClientList();
let clientIdCounter = 1;

app.use('/api/game/:gameUUID', (req: any, res, next) => {
    const { gameUUID } = req.params;
    let count = connectedUsers.get(gameUUID) || 0;

    wss.on('connection', (ws: any, upgradeReq: any) => {
        if (!ws.hasOwnProperty('id')) {
            ws.id = ++clientIdCounter;
            clientsList.addClient(ws.id, gameUUID);
        }

        count++;
        connectedUsers.set(gameUUID, count);
        const requestGameUUID = upgradeReq.url.split('/')[3];
        console.log(requestGameUUID);
        const clientsOfGameUUID = clientsList.getClientsByUrl(requestGameUUID);

        ws.send(`Connected to the WebSocket server with ID: ${gameUUID}. Total connected users: ${count}`);
        wss.clients.forEach((client: { id: string; readyState: any; _socket: { url: string | URL; }; send: (arg0: string) => void; upgradeReq: any }) => {
            if (client.readyState === WebSocket.OPEN) {
                // TODO: check if client connected to gameUUID and only send message to them if they are
                if (clientsOfGameUUID.includes(client.id)) {
                    client.send(`New user connected to the WebSocket server with ID: ${gameUUID}. Total connected users: ${count}`);
                }
            }
          });
        ws.send(`Connected to the WebSocket server with ID: ${gameUUID}`);
    });
    next();
});

server.listen(8001, () => {
    console.log('Listening on port 8001');
});


function writeToFile() {

}

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

if (process.env.NODE_ENV !== 'test') {
    app.listen(HTTP_PORT, () => {
        console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT.toString()));
    });
}




// Root endpoint
app.get("/", (req: express.Request, res: express.Response) => {
    res.json({ "message": "Ok" })
});


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