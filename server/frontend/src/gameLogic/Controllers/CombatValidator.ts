import areaDetails from '../../components/svgPaths/AreaDetails';
import { AreaName } from '../Enums/AreaNames';
import { Combat } from '../Enums/Combat'; 

const { MAX_ATTACKING_DICE } = Combat;

export class CombatValidator {
    public static isCombatValid(attackingArea: AreaName, attackingDice: number): boolean {
        return this.validateAttackingDice(attackingArea, attackingDice);
    }

    private static validateAttackingDice(attackingArea: AreaName, attackingDice: number): boolean {
        const areaDetail = areaDetails[attackingArea];
        const attackingAreaUnits = areaDetail.units;
        return (
            attackingAreaUnits > attackingDice &&
            attackingDice <= MAX_ATTACKING_DICE &&
            attackingDice > 0
        );
    }
}