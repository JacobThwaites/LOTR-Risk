import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';
import { TerritoryCard } from '../Models/TerritoryCard';
import { Symbol } from '../Enums/Symbols';
import { assert } from 'chai';
import 'mocha';

describe('TerritoryCard', () => {
    let territoryCard: TerritoryCard;
    let area: Area;
    beforeEach(function () {
        const adjacentAreas = [AreaName.THE_SHIRE];
        area = new Area(AreaName.THE_SHIRE, false, true, adjacentAreas);
        territoryCard = new TerritoryCard(area, Symbol.DARK_RIDER);
    })

    it('should have an area', () => {
        const result = territoryCard.getArea();
        assert.equal(result, area);
    });

    it('should be able to get the value of it\'s symbol', () => {
        const result = territoryCard.getSymbolValue();
        assert.equal(result, 3);
    });
});