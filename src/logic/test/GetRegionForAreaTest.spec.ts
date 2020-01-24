import { Area } from '../Models/Area';
import { Areas } from '../Enums/Areas'; 
import { Region } from '../Models/Region';
import { Regions } from '../Enums/Regions';
import { getRegionForArea } from '../../utils/getRegionForArea';
import { assert } from 'chai';
import 'mocha';

describe('getRegionForArea method', () => {
    let area: Area;
    let region: Region;
    beforeEach(function () {
        area = Areas.Forlindon;
        region = Regions.Eriador;
    })

    it('should return the region which owns an area', () => {
        const result = getRegionForArea(area);
        assert.equal(result, region);
    });
});