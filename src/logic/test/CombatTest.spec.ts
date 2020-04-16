import { CombatController } from '../Controllers/CombatController';
import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';
import { Player } from '../Models/Player';
import { Colour } from '../Enums/Colours';
import { assert } from 'chai';
import { Stronghold } from '../Models/Stronghold';

describe('Combat', () => {
    let combatController: CombatController;
    let attackingArea: Area;
    let defendingArea: Stronghold;
    let attacker: Player;
    let defender: Player;
    beforeEach(function () {
        const areas = [AreaName.TOWER_HILLS];
        attackingArea = new Area(AreaName.TOWER_HILLS, areas);
        defendingArea = new Stronghold(AreaName.EVENDIM_HILLS, areas);
        attacker = new Player('Good Person', Colour.GREEN);
        defender = new Player('Evil Person', Colour.RED);
        attacker.addUnits(10);
        defender.addUnits(10);
        attackingArea.setPlayer(attacker);
        defendingArea.setPlayer(defender);
        combatController = new CombatController(attackingArea, defendingArea);
    })

    it('should be able to get the dice bonus for a defender with a stronghold', () => {
        const result = combatController.getDefenderDiceBonus(defendingArea);
        assert.equal(result, 1);
    });

    it('should be able to get the dice bonus for a defender with a stronghold and a leader', () => {
        defendingArea.changeHasLeader();
        const result = combatController.getDefenderDiceBonus(defendingArea);
        assert.equal(result, 2);
    });

    it('should be able to get the dice bonus for an attacker with a leader', () => {
        attackingArea.changeHasLeader();
        const result = combatController.getAttackerDiceBonus(attackingArea);
        assert.equal(result, 1);
    });

    it('should not add a bonus for an attacker with a stronghold', () => {
        const result = combatController.getAttackerDiceBonus(defendingArea);
        assert.equal(result, 0);
    });
    it('should remove units from the defender if the attacker rolls higher', () => {
        const attackingRoll = 6;
        const defendingRoll = 5;
        combatController.removeUnitsFromLoser(attackingRoll, defendingRoll);
        const result = defender.getUnits();
        assert.equal(result, 9);
    });
    it('should remove units from the attacker if the defender rolls higher or equal to them', () => {
        const attackingRoll = 5;
        const defendingRoll = 5;
        combatController.removeUnitsFromLoser(attackingRoll, defendingRoll);
        const result = attacker.getUnits();
        assert.equal(result, 9);
    });
});