export default class PlayerDisconnectionTracker {
    private disconnectionCountdown: NodeJS.Timeout | null;
    private countdownCallback: Function;

    constructor(countdownCallback: Function) {
        this.countdownCallback = countdownCallback;
        this.disconnectionCountdown = null;
    }

    startDisconnectionCountdown() {
        console.log("started disconnect timeout");
        this.disconnectionCountdown = setTimeout(() => {
            console.log("notification sent");
            this.countdownCallback();
        }, 5000)
    }

    cancelDisconnectionCountdown() {
        if (this.disconnectionCountdown) {
            clearTimeout(this.disconnectionCountdown);
        }
    }
}