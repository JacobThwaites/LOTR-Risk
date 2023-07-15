import { WebSocketServer, WebSocket } from "ws";
import WebSocketWithID from "./WebSocketWithID";
import { GameEventMessage, updateGame } from "./gameEventProcessor";
import { WebSocketManager } from "./WebSocketManager";
const gameQueries = require("./database/gameQueries");
const ws = require('ws');


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

            emitMessage(messageData, wss);

            updateGame(messageData, game, wss);

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

export function emitMessage(message: GameEventMessage, wss: WebSocketServer) {
    const formattedMessage = JSON.stringify(message);
    wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === ws.OPEN) {
            client.send(formattedMessage);
        }
    });
}