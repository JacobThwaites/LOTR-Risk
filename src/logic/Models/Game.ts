import { Player } from './Player';
import { Region } from './Region';

export class Game {
    private players: Array<Player>;
    private regions: Array<Region>;
    private currentPlayersTurn: number;
    constructor(players: Array<Player>, regions: Array<Region>) {
        this.players = players;
        this.regions = regions;
        this.currentPlayersTurn = 0; 
    }

    getPlayers(): Array<Player> {
        return this.players;
    }

    getCurrentPlayer(): Player {
        const indexOfPlayer = this.currentPlayersTurn;
        return this.players[indexOfPlayer];
    }

    changeCurrentPlayer() {
        this.currentPlayersTurn += 1;
        const lastPlayer = this.players.length - 1;
        if (this.currentPlayersTurn > lastPlayer) {
            this.currentPlayersTurn = 0;
        }
    }

    getRegions(): Array<Region> {
        return this.regions;
    }

    assignStartingUnits() {
        const unitsAvailable = this.getStartingUnitsAvailable();

        for (let i = 0; i < this.players.length; i++) {
            this.players[i].addStartingUnits();
            this.players[i].addReinforcements(unitsAvailable - this.players[i].getTotalAreas());
        }
    }

    getStartingUnitsAvailable(): number {
        if (this.players.length === 2) {
            return 60;
        } else if (this.players.length === 3) {
            return 52;
        } else {
            return 45;
        }
    }
}