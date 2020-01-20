import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';
import { AdventureCard } from '../Models/AdventureCard';
import { Player } from '../Models/Player';
import { Region } from '../Models/Region';
import { Colour } from '../Enums/Colours';
import { assert } from 'chai';
import 'mocha';

describe('Player', () => {
    let area1: Area;
    let area2: Area;
    let areas: Array<Area>; 
    let card1: AdventureCard;
    let player: Player;
    let region: Region;
    beforeEach(function () {
        const adjacentAreas = [AreaName.TowerHills];
        area1 = new Area(AreaName.TheShire, false, true, adjacentAreas);
        area2 = new Area(AreaName.AnduinValley, false, false, adjacentAreas);
        areas = [area1, area2];
        region = new Region('region', areas, 10);
        card1 = new AdventureCard('Do something');
        player = new Player('Jake', Colour.Green, true);
        player.addUnits(10);
        player.addReinforcements(5);
    })

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
        assert.equal(result, 5);
    });

    it('should not be able to add more reinforcements than it has left', () => {
        player.addReinforcementsToArea(200, area1);
        const result = area1.getUnits();
        assert.equal(result, 0);
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
        assert.equal(result, 10);
    });

    it('should be able to calculate the combined bonus of areas and regions owned', () => {
        player.addRegion(region);
        const result = player.calculateTotalReinforcements();
        assert.equal(result, 13);
    });

    it('should start with no units in it\s areas', () => {
        player.addArea(area1);
        player.addArea(area2);
        let areasStartEmpty = true;

        for (let i = 0; i < areas.length; i++) {
            if (areas[i].getUnits() !== 0) {
                areasStartEmpty = false;
            }
        }
        assert.isTrue(areasStartEmpty);
    });

    it('should be able to add 1 unit to all it\'s areas at the start of the game', () => {
        player.addArea(area1);
        player.addArea(area2);
        player.addStartingUnits();

        let areasHaveOneUnit = true;

        for (let i = 0; i < areas.length; i++) {
            if (areas[i].getUnits() !== 1) {
                areasHaveOneUnit = false;
            }
        }
        assert.isTrue(areasHaveOneUnit);
    });
});