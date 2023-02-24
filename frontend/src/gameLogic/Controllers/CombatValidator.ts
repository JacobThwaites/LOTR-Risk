import { Combat } from '../Enums/Combat'; 
import { AreaType } from '../Models/AreaType';
const { MAX_ATTACKING_DICE } = Combat;

export class CombatValidator {
    public static isCombatValid(attackingArea: AreaType, attackingDice: number): boolean {
        return this.validateAttackingDice(attackingArea, attackingDice);
    }

    private static validateAttackingDice(attackingArea: AreaType, attackingDice: number): boolean {
        const attackingAreaUnits = attackingArea.getUnits();
        return (
            attackingAreaUnits > attackingDice &&
            attackingDice <= MAX_ATTACKING_DICE &&
            attackingDice > 0
        );
    }
}