import { PlayerGenerator } from '../Controllers/PlayerGenerator';
import { assert } from 'chai';
import 'mocha';

describe('Player Generator', () => {
    let playerGenerator: PlayerGenerator;
    let userID: string;
    beforeEach(function () {
        userID = 'user1'
        
        playerGenerator = new PlayerGenerator(userID);
    })

    it('should be able to generate an array of players', () => {
        const players = playerGenerator.generatePlayers(1);
        assert.typeOf(players, 'array');
        assert.typeOf(players[0], 'Object');
    });

    it('should generate the given number of players', () => {
        const players = playerGenerator.generatePlayers(3);
        const totalPlayers = players.length;
        assert.equal(totalPlayers, 3);
    });
});