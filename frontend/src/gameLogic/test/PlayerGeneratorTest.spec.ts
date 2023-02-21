import { PlayerGenerator } from '../Controllers/PlayerGenerator';
import { assert } from 'chai';
import 'mocha';

describe('Player Generator', () => {
    let numberOfPlayers: number;
    let playerGenerator: PlayerGenerator;
    beforeEach(function () {
        numberOfPlayers = 5;
        playerGenerator = new PlayerGenerator(numberOfPlayers);
    })

    it('should be able to generate an array of players', () => {
        const players = playerGenerator.generatePlayers();
        assert.typeOf(players, 'array');
        assert.typeOf(players[0], 'Object');
    });

    it('should generate the number of players specified in the constructor', () => {
        const players = playerGenerator.generatePlayers();
        const totalPlayers = players.length;
        assert.equal(totalPlayers, numberOfPlayers);
    });
});