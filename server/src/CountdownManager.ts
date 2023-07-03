import PlayerDisconnectionTracker from "./PlayerDisconnectionTracker";

class CountdownManager {
    private activeCountdowns: { [userID: string]: PlayerDisconnectionTracker};
    
    constructor() {
        this.activeCountdowns = {};
    }

    public createCountdown(userID: string, callbackFn: Function): void {
        const countdown = new PlayerDisconnectionTracker(callbackFn);
        this.activeCountdowns[userID] = countdown;
        countdown.startDisconnectionCountdown();
    }

    public cancelCountdown(userID: string) { 
        const countdown = this.activeCountdowns[userID];

        if (countdown) {
            this.activeCountdowns[userID].cancelDisconnectionCountdown();
            delete this.activeCountdowns[userID];
        }
    }
}

export const countdownManager = new CountdownManager();