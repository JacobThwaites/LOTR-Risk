import { Player } from '../Models/Player';
import { Game } from '../Models/Game'; 
import { AreaAssigner } from './AreaAssigner';
import { PlayerGenerator } from './PlayerGenerator';
import { AreaType } from '../Models/AreaType';

export class GameGenerator {
    public static generateGame(areaLists: Array<AreaType[]>, numberOfPlayers: number, userIDs: Array<string>): Game {
        const MAX_TURNS = 30;
        const players = this.generatePlayers(numberOfPlayers, userIDs);
        const areaAssigner = new AreaAssigner(players);
        areaAssigner.assignAreas(areaLists);
        const game = new Game(players, MAX_TURNS)
        game.assignStartingUnits();
        
        return game;
    }

    private static generatePlayers(numberOfPlayers: number, userIDs: Array<string>): Player[] {
        const playerGenerator = new PlayerGenerator(userIDs);
        const players = playerGenerator.generatePlayers(numberOfPlayers);
        return players;
    } 
}