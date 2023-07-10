import { CombatController } from '../Controllers/CombatController';
import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';
import { Player } from '../Models/Player';
import { Colour } from '../Enums/Colours';
import { assert } from 'chai';
import { Stronghold } from '../Models/Stronghold';
import { Game } from '../Models/Game';

describe('Combat', () => {
    let combatController: CombatController;
    let attackingArea: Area;
    let defendingArea: Stronghold;
    let attacker: Player;
    let defender: Player;
    let game: Game;
    beforeEach(function () {
        attackingArea = new Area(AreaName.TOWER_HILLS);
        defendingArea = new Stronghold(AreaName.EVENDIM_HILLS);
        attacker = new Player(1, Colour.GREEN, 'userID');
        defender = new Player(2, Colour.RED, 'userID');
        game = new Game([attacker, defender], 1);
        attacker.addUnits(10);
        defender.addUnits(10);
        attackingArea.setPlayer(attacker);
        defendingArea.setPlayer(defender);
        combatController = new CombatController(attackingArea, defendingArea, game);
    })

    it('should remove units from the defender if the attacker rolls higher', () => {
        combatController.handleResults(['attacker']);
        const result = defender.getUnits();
        assert.equal(result, 9);
    });
    it('should remove units from the attacker if the defender rolls higher or equal to them', () => {
        combatController.handleResults(['defender']);
        const result = attacker.getUnits();
        assert.equal(result, 9);
    });
});