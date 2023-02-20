import { ReinforcementController } from '../Controllers/ReinforcementController';
import { Player } from '../Models/Player';
import { Colour } from '../Enums/Colours';
import { assert } from 'chai';
import 'mocha';
import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';

describe('Reinforcements', () => {
    const player = new Player('test', Colour.GREEN);
    player.addReinforcements(1);
    const area = new Area(AreaName.ANDRAST);
    const rc = new ReinforcementController(player);

    it('should be able to add reinforcements to an area', () => {
        const startingUnits = area.getUnits();
        assert.equal(startingUnits, 0);
        rc.addReinforcements(area);
        const newTotalUnits = area.getUnits();
        assert.equal(newTotalUnits, 1);
    });
});