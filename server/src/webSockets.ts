import { WebSocketServer, WebSocket } from "ws";
import WebSocketWithUserID from "./WebSocketWithUserID";
import { updateGame } from "./gameEventProcessor";
import { WebSocketManager } from "./WebSocketManager";
import { GameEventMessage } from "./GameEventMessageFactory";
const gameQueries = require("./data/gameQueries");
const ws = require('ws');


export const onConnection = (wss: WebSocketServer, webSocketManager: WebSocketManager, gameID: string) => {
    const game = gameQueries.getByUUID(gameID);

    return (ws: WebSocket) => {
        const webSocketWithUserID = new WebSocketWithUserID(ws);
        webSocketManager.checkClientHeartbeat(webSocketWithUserID, gameID);

        ws.on('message', function (data: Buffer) {
            const messageData = parseMessageBuffer(data);

            if (webSocketManager.isMessageAlreadyProcessed(messageData)) {
                return;
            } else {
                webSocketManager.setPreviousMessageID(messageData.id);
            }

            updateGame(messageData, game, wss, webSocketManager);

            if (messageData.type === 'PLAYER JOINED') {
                if (webSocketManager.isUserAlreadyInGame(messageData.userID, gameID)) {
                    // webSocketManager.removeClient(WebSocketWithUserID, gameID);
                    webSocketManager.onPlayerReconnect(messageData.userID);
                } else {
                    game.addUserIDToPlayer(messageData.userID);
                }

                messageData.playersLeftToJoin = game.getNumPlayersLeftToJoin();
                
                webSocketWithUserID.setID(messageData.userID);
                webSocketManager.addClient(gameID, webSocketWithUserID);
                broadcastMessage(messageData, wss);
            }
        });

        ws.on('close', function () {
            webSocketManager.removeClient(webSocketWithUserID, gameID);
        })
    }
};

function parseMessageBuffer(data: Buffer) {
    const str = data.toString();
    return JSON.parse(str);
}

export function broadcastMessage(message: GameEventMessage, wss: WebSocketServer) {
    const formattedMessage = JSON.stringify(message);
    wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === ws.OPEN) {
            client.send(formattedMessage);
        }
    });
}