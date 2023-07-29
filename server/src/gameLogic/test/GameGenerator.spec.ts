import { GameGenerator } from '../Controllers/GameGenerator';
import { AreaType } from '../Models/AreaType';
import { getAreas } from '../Enums/Areas';
import { AreaName } from '../Enums/AreaNames';
import { assert } from 'chai';
import 'mocha';

describe('Game Generator', () => {
    let areaLists: Array<AreaType[]>;
    let userID: string;
    beforeEach(function () {
        const areas = getAreas();
        userID = 'user1'
        areaLists = [[areas.FANGORN], [areas.FORLINDON]];
    })

    it('should be able to generate a game with the arguments provided', () => {
        const game = GameGenerator.generateGame(areaLists, 2, userID);
        const players = game.getPlayers();
        assert.equal(2, players.length);
        assert.equal(players[0].getUserID(), userID);
        const gameAreas = game.getAreas();
        assert.containsAllKeys(gameAreas, [AreaName.FANGORN, AreaName.FORLINDON])
    });
});