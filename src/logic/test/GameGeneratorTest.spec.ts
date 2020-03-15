import { GameGenerator } from '../Controllers/GameGenerator';
import { assert } from 'chai';
import 'mocha';

describe('Game Generator', () => {
    let numberOfPlayers: number;
    let maxTurns: number;
    let gameGenerator: GameGenerator;
    beforeEach(function () {
        numberOfPlayers = 2;
        maxTurns = 5;
        gameGenerator = new GameGenerator(numberOfPlayers, maxTurns);
    })

    it('should be able to generate a game with a given number of players', () => {
        const game = gameGenerator.generateGame();
        assert.equal(numberOfPlayers, game.getPlayers().length);
    });

    it('should generate a game with a given number of max turns', () => {
        const game = gameGenerator.generateGame();
        assert.equal(maxTurns, game.getTurnsRemaining());
    });
});