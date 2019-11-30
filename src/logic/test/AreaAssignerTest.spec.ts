import { Area } from '../Models/Area';
import { AreaName} from '../Enums/AreaNames';
import { TheShire } from '../Enums/AreaAdjacencies';
import { assert } from 'chai';
import 'mocha';

describe('AreaAssigner', () => {
    let areas: Area;
    beforeEach(function () {
        areas = new Area(AreaName.TheShire, false, true, TheShire);
    })

    // it('should have a name', () => {
    //     const result = area.getName();
    //     assert.equal(result, 'The Shire');
    // });
});