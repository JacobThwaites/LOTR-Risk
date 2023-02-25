import { GameGenerator } from '../Controllers/GameGenerator';
import { AreaType } from '../Models/AreaType';
import { Areas } from '../Enums/Areas';
import { assert } from 'chai';
import 'mocha';

describe('Game Generator', () => {
    let playerIDs: number[];
    let areaLists: Array<AreaType[]>;
    let userIDs: string[];
    beforeEach(function () {
        playerIDs = [1,2];
        userIDs = ['user1', 'user2'];
        areaLists = [[Areas.FANGORN], [Areas.FORLINDON]];
    })

    it('should be able to generate a game with the player IDs provided', () => {
        const game = GameGenerator.generateGame(areaLists, playerIDs, userIDs);
        const players = game.getPlayers();
        assert.equal(playerIDs.length, players.length);

        for (let i = 0; i < players.length; i++) {
            assert.equal(playerIDs[i], players[i].getID());
        }

        for (let i = 0; i < players.length; i++) {
            assert.equal(userIDs[i], players[i].getUserID());
        }
    });
});