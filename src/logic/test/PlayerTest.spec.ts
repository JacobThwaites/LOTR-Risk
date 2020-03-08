import { Area } from '../Models/Area';
import { Areas } from '../Enums/Areas';
import { AdventureCard } from '../Models/AdventureCard';
import { Player } from '../Models/Player';
import { Region } from '../Models/Region';
import { Regions } from '../Enums/Regions';
import { Colour } from '../Enums/Colours';
import { assert } from 'chai';
import 'mocha';

describe('Player', () => {
    let area1: Area;
    let area2: Area;
    let area3: Area;
    let area4: Area;
    let area5: Area;
    let area6: Area;
    let card1: AdventureCard;
    let player: Player;
    let region: Region;
    beforeEach(function () {
        area1 = Areas.Harondor;
        area2 = Areas.Umbar;
        area3 = Areas.DeepHarad;
        area4 = Areas.Harad;
        area5 = Areas.NearHarad;
        area6 = Areas.Khand;
        region = Regions.Harawaith;
        card1 = new AdventureCard('Do something');
        player = new Player('Jake', Colour.Green, true);
        player.addUnits(10);
        player.addReinforcements(5);
    })

    it('should have a name', () => {
        const name = player.getName();
        assert.equal(name, 'Jake');
    });

    it('should be able to take a card', () => {
        player.takeAdventureCard(card1);
        const result = player.getAdventureCard(0);
        assert.equal(result, card1);
    });

    it('should be able to add an area', () => {
        player.addArea(area1);
        const result = player.getAreas().length;
        assert.equal(result, 1);
    });

    it('should be able to remove an area', () => {
        player.addArea(area1);
        player.removeArea(0);
        const result = player.getAreas().length;
        assert.equal(result, 0);
    });

    it('should be able to get more units', () => {
        player.addUnits(10);
        const result = player.getUnits();
        assert.equal(result, 20);
    });

    it('should be able to remove units', () => {
        player.removeUnits(10);
        const result = player.getUnits();
        assert.equal(result, 0);
    });

    it('should be able to add reinforcements to an area', () => {
        player.addReinforcementsToArea(5, area1);
        
        const result = area1.getUnits();
        assert.equal(result, 6);
        
    });

    it('should not be able to add more reinforcements than it has left', () => {
        player.addReinforcementsToArea(200, area2);;
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
            if (areas[i].getUnits() !== 2) {
                areasHaveOneUnit = false;
            }
        }
        assert.isTrue(areasHaveOneUnit);
    });

    it('should be able to check if it owns an area and return true if it does', () => {
        player.addArea(area1);
        const result = player.ownsArea(area1);
        assert.equal(result, true);
    });

    it('should be able to check if it owns an area and return false if it doesn\'t', () => {
        player.addArea(area1);
        const result = player.ownsArea(area2);
        assert.equal(result, false);
    });

    it('should be able to check if it owns an area and return true if it does', () => {
        player.addArea(area1);
        player.addArea(area2);
        player.addArea(area3);
        player.addArea(area4);
        player.addArea(area5);
        player.addArea(area6);
        const result = player.ownsRegion(region);
        assert.isTrue(result);
    });

    it('should be able to check if it owns a region and return false if it doesn\'t', () => {
        player.addArea(area1);
        const result = player.ownsRegion(region);
        assert.isFalse(result);
    });

    it('should check if it owns all areas in a region after adding an area and add the region if it does', () => {
        player.addArea(area1);
        player.addArea(area2);
        player.addArea(area3);
        player.addArea(area4);
        player.addArea(area5);
        player.addArea(area6);
        const hasRegions = player.calculateRegionBonus();
        assert.deepStrictEqual(hasRegions, 2);
    });
});