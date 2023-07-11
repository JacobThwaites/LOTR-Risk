import { GameGenerator } from '../Controllers/GameGenerator';
import { AreaType } from '../Models/AreaType';
import { Areas } from '../Enums/Areas';
import { assert } from 'chai';
import 'mocha';

describe('Game Generator', () => {
    let areaLists: Array<AreaType[]>;
    let userIDs: string[];
    beforeEach(function () {
        userIDs = ['user1', 'user2'];
        areaLists = [[Areas.FANGORN], [Areas.FORLINDON]];
    })

    it('should be able to generate a game with the user IDs provided', () => {
        const game = GameGenerator.generateGame(areaLists, userIDs.length, userIDs);
        const players = game.getPlayers();
        assert.equal(userIDs.length, players.length);

        for (let i = 0; i < players.length; i++) {
            assert.equal(userIDs[i], players[i].getUserID());
        }
    });
});