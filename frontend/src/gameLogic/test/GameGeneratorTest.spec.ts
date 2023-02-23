import { GameGenerator } from '../Controllers/GameGenerator';
import { AreaType } from '../Models/AreaType';
import { Areas } from '../Enums/Areas';
import { assert } from 'chai';
import 'mocha';

describe('Game Generator', () => {
    let playerIDs: number[];
    let maxTurns: number;
    let gameGenerator: GameGenerator;
    let areaLists: Array<AreaType[]>;
    beforeEach(function () {
        playerIDs = [1,2];
        maxTurns = 5;
        gameGenerator = new GameGenerator(playerIDs, maxTurns);
        areaLists = [[Areas.FANGORN], [Areas.FORLINDON]];
    })

    it('should be able to generate a game with the number of player IDs provided', () => {
        const game = gameGenerator.generateGame(areaLists);
        assert.equal(playerIDs.length, game.getPlayers().length);
    });

    it('should generate a game with a given number of max turns', () => {
        const game = gameGenerator.generateGame(areaLists);
        assert.equal(maxTurns, game.getTurnsRemaining());
    });
});