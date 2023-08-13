import { Area } from '../Models/Area';
import { Player } from '../Models/Player';
import { Region } from '../Models/Region';
import { Regions } from '../Enums/Regions';
import { Colour } from '../Enums/Colours';
import { AreaName } from '../Enums/AreaNames';
import { TerritoryCard } from '../Models/TerritoryCard';
import { Symbol } from '../Enums/Symbols';
import { assert } from 'chai';
import 'mocha';
import { getAreas } from '../Enums/Areas';
import { AreaType } from '../Models/AreaType';

describe('Player', () => {
    let area1: Area;
    let area2: Area;
    let area3: Area;
    let area4: Area;
    let area5: Area;
    let area6: Area;
    let card1: TerritoryCard;
    let player: Player;
    let region: Region;
    let regionAreas: Area[];
    beforeEach(function() {
        area1 = new Area(AreaName.HARONDOR);
        area2 = new Area(AreaName.UMBAR);
        area3 = new Area(AreaName.DEEP_HARAD);
        area4 = new Area(AreaName.HARAD);
        area5 = new Area(AreaName.NEAR_HARAD);
        area6 = new Area(AreaName.KHAND);
        regionAreas = [area1, area2, area3, area4, area5, area6];
        const regionAreaNames = [area1.getName(), area2.getName(), area3.getName(), area4.getName(), area5.getName(), area6.getName()];
        region = new Region('haradwaith', regionAreaNames, 2);
        card1 = new TerritoryCard(Symbol.ARCHER);
        player = new Player(Colour.GREEN, '');
        player.addUnits(10);
        player.addReinforcements(5);
    })

    it('should be able to set userID', () => {
        let userID = player.getUserID();
        assert.equal(userID, '');

        player.setUserID('new userID');
        userID = player.getUserID();
        assert.equal(userID, 'new userID');
    });

    it('should be able to take a card', () => {
        let cards = player.getTerritoryCards();
        assert.isEmpty(cards);
        player.addTerritoryCard(card1);
        cards = player.getTerritoryCards();
        assert.equal(cards.length, 1);
        assert.equal(cards[0], card1);
    });

    it('should be able to add an area', () => {
        player.addArea(area1);
        const result = player.getAreas().length;
        assert.equal(result, 1);
    });

    it('should add a region when it adds an area if it owns all areas in the region', () => {
        for (const area of regionAreas) {
            player.addArea(area);
        }

        assert.equal(player.calculateRegionBonus(), region.getBonusUnits());
    });

    it('should be able to remove an area by name', () => {
        player.addArea(area1);
        player.removeArea(area1);
        const result = player.getAreas().length;
        assert.equal(result, 0);
    });

    it('should remove a region when it removes and area if it no longer owns that area', () => {
        const region = Regions['HARADWAITH'];

        const regionAreas = getAreasForRegion(region);
        for (const area of regionAreas) {
            player.addArea(area);
        }

        player.removeArea(area1);
        assert.equal(player.calculateRegionBonus(), 0);
    });

    it('should be able to get more units', () => {
        player.addUnits(10);
        const result = player.getUnits();
        assert.equal(result, 25);
    });

    it('should be able to remove units', () => {
        player.removeUnits(15);
        const result = player.getUnits();
        assert.equal(result, 0);
    });

    it('should be able to add reinforcements to an area', () => {
        player.addReinforcementsToArea(area1);
        
        const result = area1.getUnits();
        assert.equal(result, 1);
        
    });

    it('should not be able to add more reinforcements than it has left', () => {
        player.addReinforcementsToArea(area2);
        const result = area2.getUnits();
        assert.equal(result, 1);
    });

    it('should be able to add a leader to an area', () => {
        player.addLeader(area1);
        const result = area1.getHasLeader();
        assert.equal(result, true);
    });

    it('should not be able to add more than one leader to an area', () => {
        player.addLeader(area1);
        player.addLeader(area1);
        const result = area1.getHasLeader();
        assert.equal(result, true);
    });

    it('should be able to calculate the bonus from areas owned', () => {
        const result = player.calculateAreaBonus();
        assert.equal(result, 3);
    });

    it('should be able to calculate the bonus from regions owned', () => {
        player.addRegion(region);
        const result = player.calculateRegionBonus();
        assert.equal(result, 2);
    });

    it('should be able to calculate the combined bonus of areas and regions owned', () => {
        player.addRegion(region);
        const result = player.calculateTotalReinforcements();
        assert.equal(result, 5);
    });

    it('should be able to add 1 unit to all it\'s areas at the start of the game', () => {
        player.addArea(area3);
        player.addArea(area4);
        player.addStartingUnits();
        const areas = player.getAreas();
        let areasHaveOneUnit = true;

        for (let i = 0; i < areas.length; i++) {
            if (areas[i].getUnits() !== 1) {
                areasHaveOneUnit = false;
            }
        }
        assert.isTrue(areasHaveOneUnit);
    });
});

function getAreasForRegion(region: Region): AreaType[] {
    const areas = Object.values(getAreas());
    const regionAreas = areas.filter(area => region.getAreaNames().includes(area.getName()));

    return regionAreas;
}