import { Area } from '../Models/Area';
import { getAreas } from '../Enums/Areas'; 
import { Region } from '../Models/Region';
import { Regions } from '../Enums/Regions';
import { getRegionForArea } from '../utils/getRegionForArea';
import { assert } from 'chai';
import 'mocha';

describe('getRegionForArea method', () => {
    let area: Area;
    let region: Region;
    beforeEach(function () {
        const areas = getAreas();
        area = areas.FORLINDON;
        region = Regions.ERIADOR;
    })

    it('should return the region which owns an area', () => {
        const result = getRegionForArea(area);
        assert.equal(result, region);
    });
});