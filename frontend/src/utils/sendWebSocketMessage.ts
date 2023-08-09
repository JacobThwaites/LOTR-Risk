import { v4 as uuidv4 } from 'uuid'; 
import { getUserID } from './userIDManager';
import { GameEventType } from './WebSocketHandler';

export function sendMessage(message: GameEventMessage, socket: WebSocket): void {
    message.id = uuidv4(); 
    message.userID = getUserID();
    socket.send(JSON.stringify(message));
}

type GameEventMessage = {
    type: GameEventType,
    [key: string]: any;
}