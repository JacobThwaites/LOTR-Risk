import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';
import { Region } from '../Models/Region';
import { assert } from 'chai';
import 'mocha';

describe('Continent', () => {
    let area: Area;
    let area2: Area;
    let areas: Array<Area>;
    let region: Region;
    beforeEach(function () {
        area = new Area(AreaName.THE_SHIRE);
        area2 = new Area(AreaName.TOWER_HILLS);
        areas = [area, area2];
        region = new Region('Test Area', areas, 5);
    })

    it('should have a name', () => {
        const result = region.getName();
        assert.equal(result, 'Test Area');
    });

    it('should have areas', () => {
        const result = region.getAreas();
        assert.equal(result, areas);
    });

    it('should have bonus units', () => {
        const result = region.getBonusUnits();
        assert.equal(result, 5);
    });
});