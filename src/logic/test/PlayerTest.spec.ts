import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';
import { AdventureCard } from '../Models/AdventureCard';
import { Player } from '../Models/Player';
import { Colour } from '../Enums/Colours';
import { assert } from 'chai';
import 'mocha';

describe('Player', () => {
    let area: Area;
    let card1: AdventureCard;
    let player: Player;
    beforeEach(function () {
        const areas = [AreaName.TowerHills];
        area = new Area(AreaName.TheShire, false, true, areas);
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

    it('should be able to remove a card', () => {
        player.takeAdventureCard(card1);
        player.removeAdventureCard(0);
        const result = player.getAdventureCards().length;
        assert.equal(result, 0);
    });

    it('should be able to add an area', () => {
        player.addArea(area);
        const result = player.getAreas().length;
        assert.equal(result, 1);
    });

    it('should be able to remove an area', () => {
        player.addArea(area);
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
        player.addReinforcementsToArea(5, area);
        const result = area.getUnits();
        assert.equal(result, 5);
    });

    it('should not be able to add more reinforcements than it has left', () => {
        player.addReinforcementsToArea(200, area);
        const result = area.getUnits();
        assert.equal(result, 0);
    });

    it('should be able to add a leader to an area', () => {
        player.addLeader(area);
        const result = area.getHasLeader();
        assert.equal(result, true);
    });

    it('should not be able to add more than one leader to an area', () => {
        player.addLeader(area);
        player.addLeader(area);
        const result = area.getHasLeader();
        assert.equal(result, true);
    });

    it('should be able to calculate the bonus from areas owned', () => {
        const result = player.calculateAreaBonus();
        assert.equal(result, 3);
    });
});