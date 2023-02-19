import { WSClientList } from './WSClientList';
import { wss } from "./index";
const WebSocket = require('ws');
const clientsList = new WSClientList();
let clientIdCounter = 1;

export const onConnection = (gameID: string) => {
    return (ws: any, upgradeReq: any) => {
        ws.on('message', function(data: Buffer) {
            const str = data.toString();
            const messageData = JSON.parse(str);
            wss.emit(messageData);
        });


        if (!ws.hasOwnProperty('id')) {
            ws.id = ++clientIdCounter;
            clientsList.addClient(ws.id, gameID);
        }

        const message = `New user connected to the WebSocket server with ID: ${gameID}.`;
        sendMessageOnURL(message, upgradeReq.url);
        ws.send(`Connected to the WebSocket server with ID: ${gameID}`);
    }
};

function sendMessageOnURL(message: string, url: string) {
    const clientIDs = getGameClientIDs(url);
    const gameClients = filterClientsByID(wss.clients, clientIDs);

    gameClients.forEach((client: any) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

function getGameClientIDs(upgradeReqURL: string) {
    const requestgameID = upgradeReqURL.split('/')[3];
    const clientsOfGameID = clientsList.getClientsByUrl(requestgameID);

    return clientsOfGameID;
}

function filterClientsByID(clients: Array<any>, clientIDs: Array<any>): Array<any> {
    const filtered: Array<any> = [];

    clients.forEach((client) => {
        if (clientIDs.includes(client.id)) {
            filtered.push(client);
        }
    });

    return filtered;
}

