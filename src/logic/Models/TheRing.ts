export class TheRing {
    private currentTurn: number;
    private maxTurns: number;
    constructor(maxTurns: number) {
        this.currentTurn = 1;
        this.maxTurns = maxTurns;
    }

    getCurrentTurn(): number {
        return this.currentTurn;
    }

    incrementCurrentTurn() {
        this.currentTurn += 1;
    }

    maxTurnsReached(): boolean {
        return this.currentTurn === this.maxTurns;
    }
}
