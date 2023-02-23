import { Player } from '../Models/Player';
import { Game } from '../Models/Game'; 
import { AreaAssigner } from './AreaAssigner';
import { PlayerGenerator } from './PlayerGenerator';
import { AreaType } from '../Models/AreaType';

export class GameGenerator {
    public static generateGame(areaLists: Array<AreaType[]>, playerIDs: Array<number>): Game {
        const MAX_TURNS = 30;
        const players = this.generatePlayers(playerIDs);
        const areaAssigner = new AreaAssigner(players);
        areaAssigner.assignAreas(areaLists);
        const game = new Game(players, MAX_TURNS)
        game.assignStartingUnits();
        
        return game;
    }

    private static generatePlayers(playerIDs: Array<number>): Player[] {
        const playerGenerator = new PlayerGenerator(playerIDs);
        const players = playerGenerator.generatePlayers();
        return players;
    } 
}