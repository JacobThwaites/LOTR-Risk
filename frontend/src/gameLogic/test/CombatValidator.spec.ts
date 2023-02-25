import { Area } from '../Models/Area';
import { Areas } from '../Enums/Areas'; 
import { CombatValidator } from '../Controllers/CombatValidator';
import { assert } from 'chai';
import 'mocha';

describe('CombatValidator', () => {
    let attackingArea: Area;
    beforeAll(function() {
        attackingArea = Areas.FORLINDON;
        attackingArea.addUnits(3);
    })

    it('should return true if attackingDice is less than the attacking area\'s units', () => {
        const attackingDice = 2;
        const isCombatValid = CombatValidator.isCombatValid(attackingArea, attackingDice);
        assert.isTrue(isCombatValid);
    });

    it('should return false if attackingDice is greater than or equal to the attacking area\'s units', () => {
        const equalToDice = 3;
        let isValid = CombatValidator.isCombatValid(attackingArea, equalToDice);
        assert.isFalse(isValid);

        const greaterThanDice = 4;
        const isSecondCombatValid = CombatValidator.isCombatValid(attackingArea, greaterThanDice);
        assert.isFalse(isSecondCombatValid);
    });

    it('should return true if attackingDice is less than or equal to max attacking dice', () => {
        attackingArea.addUnits(1);
        const equalToDice = 3;
        let isValid = CombatValidator.isCombatValid(attackingArea, equalToDice);
        assert.isTrue(isValid);
        
        const lessThanDice = 2;
        isValid = CombatValidator.isCombatValid(attackingArea, lessThanDice);
        assert.isTrue(isValid);
    });

    it('should return false if attackingDice is greater than max attacking dice', () => {
        const attackingDice = 4;
        const isCombatValid = CombatValidator.isCombatValid(attackingArea, attackingDice);
        assert.isFalse(isCombatValid);
    });

    it('should return true if attackingDice is less than or equal to max attacking dice', () => {
        const equalToDice = 2;
        let isCombatValid = CombatValidator.isCombatValid(attackingArea, equalToDice);
        assert.isTrue(isCombatValid);
        
        const lessThanDice = 1;
        isCombatValid = CombatValidator.isCombatValid(attackingArea, lessThanDice);
        assert.isTrue(isCombatValid);
    });

    it('should return false if dice is less than 1', () => {
        const dice = 0;
        const isAttackingCombatValid = CombatValidator.isCombatValid(attackingArea, dice);
        assert.isFalse(isAttackingCombatValid);
    });
});