import { Player } from '../Models/Player';
import { Game } from '../Models/Game'; 
import { AreaAssigner } from './AreaAssigner';
import { PlayerGenerator } from './PlayerGenerator';

export class GameGenerator {
    private numberOfPlayers: number;
    private maxTurns: number;
    constructor(numberOfPlayers: number, maxTurns: number) {
        this.numberOfPlayers = numberOfPlayers;
        this.maxTurns = maxTurns;
    }

    generateGame(): Game {
        const players = this.generatePlayers();
        this.assignAreas(players);
        const game = new Game(players, this.maxTurns)
        game.assignStartingUnits();
        
        return game;
    }

    private assignAreas(players: Player[]): void {
        const areaAssigner = new AreaAssigner(players);
        areaAssigner.assignAreas();
    }

    private generatePlayers(): Player[] {
        const playerGenerator = new PlayerGenerator(this.numberOfPlayers);
        const players = playerGenerator.generatePlayers();
        return players;
    } 
}