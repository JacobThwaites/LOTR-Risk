import { Area } from '../Models/Area';
import { TerritoryCard } from '../Models/TerritoryCard';
import { Symbol } from '../Enums/Symbols';
import { assert } from 'chai';
import 'mocha';

describe('TerritoryCard', () => {
    let territoryCard: TerritoryCard;
    let area: Area;
    beforeEach(function () {
        const adjacentAreas = [area];
        area = new Area('Hobbiton', false, true, adjacentAreas);
        territoryCard = new TerritoryCard(area, Symbol.darkRider);
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