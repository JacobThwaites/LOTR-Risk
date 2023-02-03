// Keeps track of which URL each client is connected to
export class WSClientList {
    protected clients: any;

    constructor() {
        this.clients = {}
    }

    addClient(clientId: string, url: string): void {
        if (this.clients.hasOwnProperty(url)) {
            this.clients[url].push(clientId);
        } else {
            this.clients[url] = [clientId];
        }
    }

    getClientsByUrl(url: string): Array<string> {
        if (this.clients.hasOwnProperty(url)) {
            return this.clients[url];
        } else {
            return [];
        }
    }

    removeUrl(url: string): void {
        delete this.clients[url];
    }
}