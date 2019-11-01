import { Player } from './Player';
import { TheRing } from './TheRing';
import { Board } from './Board';
import { Region } from './Region';
import { Area } from './Area';

export class Game {
    private players: Array<Player>;
    private theRing: TheRing;
    private board: Board;
    private regions: Array<Region>;
    private currentPlayersTurn: number;
    constructor(players: Array<Player>, theRing: TheRing, board: Board, regions: Array<Region>) {
        this.players = players;
        this.theRing = theRing;
        this.board = board;
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
}