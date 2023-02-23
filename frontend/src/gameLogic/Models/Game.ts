import { Player } from './Player';

export class Game {
    private players: Array<Player>;
    private maxTurns: number;
    private currentTurn: number;
    private currentPlayersTurn: number;
    constructor(players: Array<Player>, maxTurns: number) {
        this.players = players;
        this.maxTurns = maxTurns;
        this.currentTurn = 0;
        this.currentPlayersTurn = 0;
    }

    getPlayers(): Array<Player> {
        return this.players;
    }

    getCurrentPlayer(): Player {
        const indexOfPlayer = this.currentPlayersTurn;
        return this.players[indexOfPlayer];
    }

    getTurnsRemaining(): number {
        return this.maxTurns - this.currentTurn;
    }

    handleNewTurn() {
        this.changeCurrentPlayer();
        const newCurrentPlayer = this.getCurrentPlayer();
        newCurrentPlayer.addReinforcementsForNewTurn();
    }

    changeCurrentPlayer() {
        this.currentPlayersTurn += 1;
        const lastPlayer = this.players.length - 1;
        if (this.currentPlayersTurn > lastPlayer) {
            this.currentPlayersTurn = 0;
            this.incrementCurrentTurn();
        }
    }

    assignStartingUnits() {
        const unitsAvailable = this.getStartingUnitsAvailable();

        for (let i = 0; i < this.players.length; i++) {
            this.players[i].addReinforcements(unitsAvailable);
            this.players[i].addStartingUnits();
        }
    }

    getStartingUnitsAvailable(): number {
        // TODO: remove after testing
        return 34;
        // if (this.players.length === 2) {
        //     return 60;
        // } else if (this.players.length === 3) {
        //     return 52;
        // } else {
        //     return 45;
        // }
    }

    playersHaveReinforcements(): boolean {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getReinforcements() > 0) {
                return true;
            }
        }

        return false;
    }

    incrementCurrentTurn() {
        this.currentTurn++;
    }

    checkMaxTurnsReached(): boolean {
        return this.maxTurns <= this.currentTurn;
    }

    getNextUnusedPlayer(): Player | boolean {
        for (let i = 0; i < this.players.length; i++) {
            if (!this.players[i].getUserID()) {
                return this.players[i];
            }
        }

        return false;
    }
}