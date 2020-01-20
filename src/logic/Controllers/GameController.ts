import { Player } from '../Models/Player';
import { Regions } from '../Enums/Regions';
import { Game } from '../Models/Game'; 
import { AreaAssigner } from '../Controllers/AreaAssigner';

export class GameController {
    private players: Player[];
    private game: Game;
    constructor(players: Player[], maxTurns: number) {
        this.players = players;
        this.game = new Game(players, Regions, maxTurns);
    }

    generateGame(): Game {
        const areaAssigner = new AreaAssigner(this.players);
        areaAssigner.assignAreas();
        this.game.assignStartingUnits();
        
        return this.game;
    }
}