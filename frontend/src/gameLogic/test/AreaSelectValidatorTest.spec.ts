import { assert } from 'chai';
import 'mocha';
import { Player } from '../Models/Player';
import { Area } from '../Models/Area';
import { Areas } from '../Enums/Areas';
import { Colour } from '../Enums/Colours';
import { getAreasForUnitManeuvre } from '../Controllers/AreaSelectValidator';

describe('AreaSelectValidator', () => {
    let player: Player;
    let area1: Area;
    let area2: Area;
    let area3: Area;
    let area4: Area;
    beforeEach(function () {
        player = new Player(1, Colour.GREEN, 'userID');
        area1 = Areas.HARLINDON;
        area2 = Areas.LUNE_VALLEY;
        area3 = Areas.MITHLOND;
        area4 = Areas.FORLINDON;
        player.addArea(area1);
        player.addArea(area2);
        player.addArea(area3);
    })

    it('should get a list of connected areas belonging to the player', () => {
        const result = getAreasForUnitManeuvre(area1, player);
        const expected = [area1, area3, area2];

        assert.includeMembers(result, expected)
    });

    it('should not include adjacent areas if they don\'t belong to the player', () => {
        const result = getAreasForUnitManeuvre(area1, player);
        assert.notInclude(result, area4)
    });
});