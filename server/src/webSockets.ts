import { WebSocketServer, WebSocket } from "ws";
import WebSocketWithID from "./WebSocketWithID";
import PlayerDisconnectionTracker from "./PlayerDisconnectionTracker";
import { countdownManager } from "./CountdownManager";
import { Game } from "./gameLogic/Models/Game";
import { Areas } from "./gameLogic/Enums/Areas";
const gameQueries = require("./database/gameQueries");

import { v4 as uuidv4 } from 'uuid';
const ws = require('ws');

export class WebSocketManager {
    private servers: { [gameID: string]: WebSocketServer };
    private clients: { [gameID: string]: { [userID: string]: WebSocket } };
    private previousMessageID: string;
    constructor() {
        this.servers = {};
        this.clients = {};
        this.previousMessageID = '';
    }

    public isMessageAlreadyProcessed(messageData: {[id: string]: string}): boolean {
        return messageData.id === this.previousMessageID;
    }
    
    public setPreviousMessageID(messageID: string): void {
        this.previousMessageID = messageID;
    }

    public getGameServer(gameID: string) {
        if (this.servers[gameID]) {
            return this.servers[gameID];
        }

        this.servers[gameID] = new ws.Server({ noServer: true });
        this.clients[gameID] = {};
        return this.servers[gameID];
    }

    public addClient(gameID: string, ws: WebSocketWithID) {
        this.clients[gameID][ws.getID()] = ws.getWebSocketInstance();
    }

    public removeClient(webSocketWithID: WebSocketWithID, gameID: string): void {
        webSocketWithID.getWebSocketInstance().close();
        console.log("removing client");
        delete this.clients[gameID][webSocketWithID.getID()];
    }

    public isUserAlreadyInGame(userID: string, gameID: string): boolean {
        return this.clients[gameID].hasOwnProperty(userID);
    }

    public checkClientHeartbeat(webSocketWithID: WebSocketWithID, gameID: string) {
        const ws = webSocketWithID.getWebSocketInstance();
        const pingInterval = setInterval(() => {
            ws.ping();
        }, 5000);

        ws.on('pong', () => {
            clearTimeout(pingTimeout);
            pingTimeout = this.createHeartbeatTimeout(webSocketWithID, gameID, pingInterval);
        });

        let pingTimeout = this.createHeartbeatTimeout(webSocketWithID, gameID, pingInterval);
    }

    private createHeartbeatTimeout(webSocketWithID: WebSocketWithID, gameID: string, pingInterval: NodeJS.Timer) {
        return setTimeout(() => {
            this.broadcastPlayerDisconnect(gameID, webSocketWithID);
            this.removeClient(webSocketWithID, gameID);
            this.startDisconnectTimeout(webSocketWithID.getID(), gameID);

            const server = this.getGameServer(gameID);
            if (!server.clients.size) {
                this.removeGameServer(gameID);
            }

            clearInterval(pingInterval);
        }, 10000);
    }

    broadcastPlayerDisconnect(gameID: string, webSocketWithID: WebSocketWithID): void {
        const server = this.getGameServer(gameID);
        const message = { id: uuidv4(), type: "PLAYER DISCONNECTED", user: webSocketWithID.getID() };
        emitMessage(JSON.stringify(message), server);
    }

    removeGameServer(gameID: string) {
        const wss = this.servers[gameID];
        wss.close();
        delete this.servers[gameID];
        delete this.clients[gameID];
    }

    startDisconnectTimeout(userID: string, gameID: string): void {
        const disconnectionTracker = new PlayerDisconnectionTracker(() => this.onUserTimeout(userID, gameID));
        disconnectionTracker.startDisconnectionCountdown();
    }

    onUserTimeout(userID: string, gameID: string) {
        const server = this.getGameServer(gameID);
        const message = { id: uuidv4(), type: "GAME OVER DISCONNECTION", userID };
        emitMessage(JSON.stringify(message), server);
    }

    onPlayerReconnect(userID: string) {
        countdownManager.cancelCountdown(userID);
    }
}

export const onConnection = (wss: WebSocketServer, webSocketManager: WebSocketManager, gameID: string) => {
    const game = gameQueries.getByUUID(gameID);
    
    return (ws: WebSocket) => {
        const webSocketWithID = new WebSocketWithID(ws);
        webSocketManager.checkClientHeartbeat(webSocketWithID, gameID);

        ws.on('message', function (data: Buffer) {
            const messageData = parseMessageBuffer(data);
            if (webSocketManager.isMessageAlreadyProcessed(messageData)) {
                return;
            } else {
                webSocketManager.setPreviousMessageID(messageData.id);
            }

            emitMessage(JSON.stringify(messageData), wss);

            const gameUpdateMessage = updateGame(messageData, game);
            if (gameUpdateMessage) {
                emitMessage(JSON.stringify(gameUpdateMessage), wss);
            }

            if (messageData.type === 'PLAYER JOINED') {
                if (webSocketManager.isUserAlreadyInGame(messageData.userID, gameID)) {
                    // webSocketManager.removeClient(webSocketWithID, gameID);
                    webSocketManager.onPlayerReconnect(messageData.userID);
                }
                webSocketWithID.setID(messageData.userID);
                webSocketManager.addClient(gameID, webSocketWithID);
            }
        });

        ws.on('close', function () {
            webSocketManager.removeClient(webSocketWithID, gameID);
        })
    }
};

function parseMessageBuffer(data: Buffer) {
    const str = data.toString();
    return JSON.parse(str);
}

function emitMessage(message: string, wss: WebSocketServer) {
    wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === ws.OPEN) {
            client.send(message);
        }
    });
}


// Update game logic - move to separate module later

enum GameEventType {
    CLEAR_SELECTED_AREAS = "CLEAR SELECTED AREAS",
    COMBAT = "COMBAT",
    COMBAT_RESULTS = "COMBAT RESULTS",
    STARTING_REINFORCEMENT = "STARTING REINFORCEMENT",
    REINFORCEMENT = "REINFORCEMENT",
    END_TURN = "END TURN",
    UNIT_MANEURVRE = "UNIT MANEUVRE",
    TROOP_TRANSFER_SETUP = "TROOP TRANSFER SETUP",
    TROOP_TRANSFER = "TROOP TRANSFER",
    PLAYER_JOINED = "PLAYER JOINED",
    PLAYER_DISCONNECT = "PLAYER DISCONNECTED",
    GAME_OVER_DISCONNECT = "GAME OVER DISCONNECTION",
    // Use for any changes to area owner or units
    UPDATE_AREA = "UPDATE AREA"
}

type GameEventMessage = {
    id: string,
    type: GameEventType
}

function updateGame(messageData: any, game: Game): GameEventMessage | void {
    switch (messageData.type) {
        case GameEventType.STARTING_REINFORCEMENT: {
            const area = Areas[messageData.areaName];
            const currentPlayer = game.getCurrentPlayer();
            
            if (currentPlayer.getUserID() !== messageData.userID) {
                console.log("message sent from incorrect player");
                return;
            }

            currentPlayer.addReinforcementsToArea(area);

            const areaUpdateMessage = {
                type: GameEventType.UPDATE_AREA,
                id: messageData.id, 
                areaName: area.getName(),
                areaUnits: area.getUnits(),
                areaColour: area.getPlayer()?.getColour()
            }

            return areaUpdateMessage;
        }
    }
}
