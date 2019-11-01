import { Area } from '../Models/Area';
import { AreaName} from '../Enums/AreaNames';
import { assert } from 'chai';
import 'mocha';

describe('Area', () => {
    let area: Area;
    let area2: Area;
    let adjacentAreas1: Array<AreaName>;
    let adjacentAreas2: Array<AreaName>;
    beforeEach(function () {
        adjacentAreas1 = [AreaName.TheWold];
        adjacentAreas2 = [AreaName.TheShire];
        area = new Area(AreaName.TheShire, false, true, adjacentAreas1);
        area2 = new Area(AreaName.TheWold, false, false, adjacentAreas2);
    })

    it('should have a name', () => {
        const result = area.getName();
        assert.equal(result, 'The Shire');
    });

    it('should specify stronghold', () => {
        const result = area.getIsStronghold();
        assert.equal(result, false);
    });

    it('should specify site of power', () => {
        const result = area.getIsSiteOfPower();
        assert.equal(result, true);
    });

    it('should not start occupied', () => {
        const result = area.getIsOccupied();
        assert.equal(result, false);
    });

    it('should be able to become occupied', () => {
        area.becomeOccupied();
        const result = area.getIsOccupied();
        assert.equal(result, true);
    });

    it('should not start with a leader', () => {
        const result = area.getHasLeader();
        assert.equal(result, false);
    });

    it('should be able to add a leader', () => {
        area.changeHasLeader();
        const result = area.getHasLeader();
        assert.equal(result, true);
    });

    it('should not start with any units', () => {
        const result = area.hasUnitsReminaing();
        assert.equal(result, false);
    });

    it('should be able to add units', () => {
        area.addUnits(5);
        const result = area.getUnits();
        assert.equal(result, 5);
    });

    it('should be able to remove units', () => {
        area.addUnits(5);
        area.removeUnits(4);
        const result = area.getUnits();
        assert.equal(result, 1);
    });

    it('should return true if an area name is adjacent', () => {
        const result = area.checkAreaIsAdjacent(AreaName.TheWold);
        assert.equal(result, true);
    });

    it('should return false if an area name is not adjacent', () => {
        const result = area.checkAreaIsAdjacent(AreaName.MountDoom);
        assert.equal(result, false);
    });
});