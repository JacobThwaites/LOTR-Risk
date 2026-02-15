import WebSocketHandler from "./WebSocketHandler";

interface IWebSocketHandlers {[gameID: string]: WebSocketHandler};
const webSocketHandlers: IWebSocketHandlers = {};

export default function makeWebSocketHandler(gameID: string, webSocket: WebSocket): WebSocketHandler {
    if (!webSocketHandlers.hasOwnProperty(gameID)) {
        webSocketHandlers[gameID] = new WebSocketHandler(gameID, webSocket); 
    }

    return webSocketHandlers[gameID];
}