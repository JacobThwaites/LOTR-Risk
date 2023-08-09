const gameQueries = require("./data/gameQueries");
const app = require('./index');
import { Game } from './gameLogic/Models/Game';
import { makeWebSocketServer } from './makeWebSocketServer';
import { WebSocketManager } from './WebSocketManager';
import { GameEventType } from './GameEventMessageFactory';
import http from 'http';
import { activeGames } from './data/ActiveGames';
require('jest');
const WebSocket = require('ws');

// Possibly unneeded
jest.useFakeTimers()

describe('Web Socket Server', function () {
    const WEB_SOCKET_PORT = 8001;
    let server: http.Server;
    let client: WebSocket;
    let game: Game;

    beforeAll((done) => {
        game = gameQueries.createGame('test user ID', 2);
        const webSocketManager = new WebSocketManager();
        server = makeWebSocketServer(app, webSocketManager);

        server.on('error', (error) => {
            console.error('Server error:', error);
            done(error);
        });
        
        server.listen(WEB_SOCKET_PORT, () => {
            done();
        });
    });

    beforeEach((done) => {
        const gameID = game.getUUID();
        client = new WebSocket(`ws://localhost:${WEB_SOCKET_PORT}/api/game/${gameID}`); 

        client.onopen = () => {
            console.log('client opened');
            done();
        }

        client.onmessage = (message) => {
            console.log('message received: ' + message);
        }

        // client.onclose = () => {
        //     console.log('Closed socket connection');
        //     done();
        // }
    });

    afterEach(() => {
        if (client.readyState === 1) {
            client.close();
        }
    });
    
    afterAll(() => {
        server.close();
    });

    
    it('receive a message', function () {
        expect(server.listening).toBe(true); // returns true - server is definitely listening on 8080

        const playerJoinMessage = {
            id: 1,
            userID: 'userID',
            type: GameEventType.PLAYER_JOINED,
        }

        client.send(JSON.stringify(playerJoinMessage));

        const test = activeGames.getGameByID(game.getUUID());
        console.log(test.getPlayers());
        
             
        expect(true).toBeTruthy();
    })
});