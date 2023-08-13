import WebSocket from 'ws';

export default class WebSocketWithUserID {
    private id: string;
    private webSocketInstance: WebSocket;

    constructor(webSocketInstance: WebSocket) {
        this.id = "";
        this.webSocketInstance = webSocketInstance;
    }

    getID(): string {
        return this.id;
    }

    setID(id: string): void {
        this.id = id;
    }

    getWebSocketInstance(): WebSocket {
        return this.webSocketInstance;
    }
}