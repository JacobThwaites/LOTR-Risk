import { Area } from '../Models/Area';
import { AreaName} from '../Enums/AreaNames';
import { Region } from '../Models/Region';
import { Board } from '../Models/Board';
import { assert } from 'chai';
import 'mocha';

describe('Board', () => {

    let area: Area;
    let area2: Area;
    let region: Region;
    let regions: Array<Region>;
    let board: Board;
    beforeEach(function () {
        const adjacentAreas = [AreaName.TheShire, AreaName.Moria];
        area = new Area(AreaName.TheShire, false, true, adjacentAreas);
        area2 = new Area(AreaName.Moria, true, false, adjacentAreas);
        const areas = [area, area2];
        region = new Region('Test Area', areas, 5);
        regions = [region];
        board = new Board(regions);
    })

    it('should have continents', () => {
        const result = board.getRegions();
        assert.equal(result, regions);
    });

});