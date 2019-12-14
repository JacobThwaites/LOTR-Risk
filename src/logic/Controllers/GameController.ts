import { Player } from '../Models/Player';
import { Areas } from '../Enums/Areas';
import { Regions } from '../Enums/Regions';
import { Game } from '../Models/Game'; 
import { TheRing } from '../Models/TheRing';
import { Board } from '../Models/Board';
import { AreaAssigner } from '../Controllers/AreaAssigner';

export class GameController {
    private players: Player[];
    private maxTurns: number;
    constructor(players: Player[], maxTurns: number) {
        this.players = players;
        this.maxTurns = maxTurns;
    }

    generateGame() {
        const ring = new TheRing(this.maxTurns);
        const board = new Board(Regions);
        const game = new Game(this.players, ring, board, Regions);
        const areaAssigner = new AreaAssigner(this.players);
        areaAssigner.assignAreas();
        return game;
    }
}