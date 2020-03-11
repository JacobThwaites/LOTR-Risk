import { Area } from '../Models/Area';
import { Areas } from '../Enums/Areas'; 
import { CombatValidator } from '../../logic/Controllers/CombatValidator';
import { assert } from 'chai';
import 'mocha';

describe('CombatValidator', () => {
    let attackingArea: Area;
    let defendingArea: Area;
    let combatValidator: CombatValidator;
    before(function() {
        attackingArea = Areas.Forlindon;
        defendingArea = Areas.Minhiriath;
        attackingArea.addUnits(3);
        defendingArea.addUnits(3);
        combatValidator = new CombatValidator(attackingArea, defendingArea);
    })

    it('should return true if attackingDice is less than the attacking area\'s units', () => {
        const totalAttackingDice = 2;
        const isCombatValid = combatValidator.validateAttackingDice(totalAttackingDice);
        assert.isTrue(isCombatValid);
    });

    it('should return false if attackingDice is greater than or equal to the attacking area\'s units', () => {
        const equalToDice = 3;
        const isFirstCombatValid = combatValidator.validateAttackingDice(equalToDice);
        assert.isFalse(isFirstCombatValid);

        const greaterThanDice = 4;
        const isSecondCombatValid = combatValidator.validateAttackingDice(greaterThanDice);
        assert.isFalse(isSecondCombatValid);
    });

    it('should return true if attackingDice is less than or equal to max attacking dice', () => {
        attackingArea.addUnits(1);
        const equalToDice = 3;
        const isFirstCombatValid = combatValidator.validateAttackingDice(equalToDice);
        assert.isTrue(isFirstCombatValid);
        
        const lessThanDice = 2;
        const isSecondCombatValid = combatValidator.validateAttackingDice(lessThanDice);
        assert.isTrue(isSecondCombatValid);
    });

    it('should return false if attackingDice is greater than max attacking dice', () => {
        const attackingDice = 4;
        const isCombatValid = combatValidator.validateAttackingDice(attackingDice);
        assert.isFalse(isCombatValid);
    });

    it('should return true if defendingDice is less than or equal to the attacking area\'s units', () => {
        const equalToDice = 2;
        const isFirstCombatValid = combatValidator.validateDefendingDice(equalToDice);
        assert.isTrue(isFirstCombatValid);

        const lessThanDice = 1;
        const isSecondCombatValid = combatValidator.validateDefendingDice(lessThanDice);
        assert.isTrue(isSecondCombatValid);
    });

    it('should return false if defendingDice is greater than defending area\'s units', () => {
        const defendingDice = 4;
        const isCombatValid = combatValidator.validateDefendingDice(defendingDice);
        assert.isFalse(isCombatValid);
    });

    it('should return true if attackingDice is less than or equal to max attacking dice', () => {
        const equalToDice = 2;
        const isFirstCombatValid = combatValidator.validateDefendingDice(equalToDice);
        assert.isTrue(isFirstCombatValid);
        
        const lessThanDice = 1;
        const isSecondCombatValid = combatValidator.validateDefendingDice(lessThanDice);
        assert.isTrue(isSecondCombatValid);
    });

    it('should return false if attackingDice is greater than max attacking dice', () => {
        const defendingDice = 3;
        const isCombatValid = combatValidator.validateDefendingDice(defendingDice);
        assert.isFalse(isCombatValid);
    });

    it('should return true if defendingDice is less than or equal to attackingDice', () => {
        let attackingDice = 2;
        let defendingDice = 1;
        let isCombatValid = combatValidator.compareDice(attackingDice, defendingDice);
        assert.isTrue(isCombatValid);

        defendingDice = 2;
        isCombatValid = combatValidator.compareDice(attackingDice, defendingDice);
        assert.isTrue(isCombatValid);
    });

    it('should return false if defendingDice is greater than attackingDice', () => {
        let attackingDice = 2;
        let defendingDice = 3;
        let isCombatValid = combatValidator.compareDice(attackingDice, defendingDice);
        assert.isFalse(isCombatValid);

        defendingDice = 2;
        isCombatValid = combatValidator.compareDice(attackingDice, defendingDice);
        assert.isTrue(isCombatValid);
    });

    it('should return false if dice is less than 1', () => {
        const dice = 0;
        const isAttackingCombatValid = combatValidator.validateAttackingDice(dice);
        assert.isFalse(isAttackingCombatValid);

        const isDefendingCombatValid = combatValidator.validateDefendingDice(dice);
        assert.isFalse(isDefendingCombatValid);
    });
});