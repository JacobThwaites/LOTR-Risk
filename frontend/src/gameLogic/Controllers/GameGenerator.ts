import { Player } from '../Models/Player';
import { Game } from '../Models/Game'; 
import { AreaAssigner } from './AreaAssigner';
import { PlayerGenerator } from './PlayerGenerator';
import { AreaType } from '../Models/AreaType';

export class GameGenerator {
    private numberOfPlayers: number;
    private maxTurns: number;
    constructor(numberOfPlayers: number, maxTurns: number) {
        this.numberOfPlayers = numberOfPlayers;
        this.maxTurns = maxTurns;
    }

    generateGame(areaLists: Array<AreaType[]>): Game {
        const players = this.generatePlayers();
        const areaAssigner = new AreaAssigner(players);
        areaAssigner.assignAreas(areaLists);
        const game = new Game(players, this.maxTurns)
        game.assignStartingUnits();
        
        return game;
    }

    private generatePlayers(): Player[] {
        const playerGenerator = new PlayerGenerator(this.numberOfPlayers);
        const players = playerGenerator.generatePlayers();
        return players;
    } 
}