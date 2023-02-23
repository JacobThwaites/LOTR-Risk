import { PlayerGenerator } from '../Controllers/PlayerGenerator';
import { assert } from 'chai';
import 'mocha';

describe('Player Generator', () => {
    let playerGenerator: PlayerGenerator;
    let playerIDs: number[];
    beforeEach(function () {
        playerIDs = [1,2,3];
        
        playerGenerator = new PlayerGenerator(playerIDs);
    })

    it('should be able to generate an array of players', () => {
        const players = playerGenerator.generatePlayers();
        assert.typeOf(players, 'array');
        assert.typeOf(players[0], 'Object');

        for (let i = 0; i < players.length; i++) {
            assert.equal(players[i].getID(), playerIDs[i]);
        }
    });

    it('should generate a player for each playerID provided', () => {
        const players = playerGenerator.generatePlayers();
        const totalPlayers = players.length;
        assert.equal(totalPlayers, playerIDs.length);
    });
});