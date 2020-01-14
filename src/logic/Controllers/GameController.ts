import { Player } from '../Models/Player';
import { Regions } from '../Enums/Regions';
import { Game } from '../Models/Game'; 
import { AreaAssigner } from '../Controllers/AreaAssigner';

export class GameController {
    private players: Player[];
    private maxTurns: number;
    constructor(players: Player[], maxTurns: number) {
        this.players = players;
        this.maxTurns = maxTurns;
    }

    generateGame() {
        const game = new Game(this.players, Regions);
        const areaAssigner = new AreaAssigner(this.players);
        areaAssigner.assignAreas();
        game.assignStartingUnits();
        
        return game;
    }

    
}