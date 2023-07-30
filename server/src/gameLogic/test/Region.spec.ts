import { AreaName } from '../Enums/AreaNames';
import { Region } from '../Models/Region';
import { assert } from 'chai';
import 'mocha';

describe('Region', () => {
    let areaNames: Array<AreaName>;
    let regionName: string;
    let region: Region;
    beforeEach(function () {
        regionName = 'Test Region';
        areaNames = [AreaName.THE_SHIRE, AreaName.TOWER_HILLS];
        region = new Region(regionName, areaNames, 5);
    })

    it('should have a name', () => {
        const result = region.getName();
        assert.equal(result, regionName);
    });

    it('should have areas names', () => {
        const result = region.getAreaNames();
        assert.equal(result, areaNames);
    });

    it('should have bonus units', () => {
        const result = region.getBonusUnits();
        assert.equal(result, 5);
    });
});