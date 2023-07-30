export default class PlayerDisconnectionTracker {
    private disconnectionCountdown: NodeJS.Timeout | null;
    private countdownCallback: Function;

    constructor(countdownCallback: Function) {
        this.countdownCallback = countdownCallback;
        this.disconnectionCountdown = null;
    }

    startDisconnectionCountdown() {
        this.disconnectionCountdown = setTimeout(() => {
            this.countdownCallback();
        }, 60000)
    }

    cancelDisconnectionCountdown() {
        if (this.disconnectionCountdown) {
            clearTimeout(this.disconnectionCountdown);
        }
    }
}