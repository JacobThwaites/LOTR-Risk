import { GameGenerator } from '../Controllers/GameGenerator';
import { AreaType } from '../Models/AreaType';
import { Areas } from '../Enums/Areas';
import { assert } from 'chai';
import 'mocha';

describe('Game Generator', () => {
    let numberOfPlayers: number;
    let maxTurns: number;
    let gameGenerator: GameGenerator;
    let areaLists: Array<AreaType[]>;
    beforeEach(function () {
        numberOfPlayers = 2;
        maxTurns = 5;
        gameGenerator = new GameGenerator(numberOfPlayers, maxTurns);
        areaLists = [[Areas.FANGORN], [Areas.FORLINDON]];
    })

    it('should be able to generate a game with a given number of players', () => {
        const game = gameGenerator.generateGame(areaLists);
        assert.equal(numberOfPlayers, game.getPlayers().length);
    });

    it('should generate a game with a given number of max turns', () => {
        const game = gameGenerator.generateGame(areaLists);
        assert.equal(maxTurns, game.getTurnsRemaining());
    });
});