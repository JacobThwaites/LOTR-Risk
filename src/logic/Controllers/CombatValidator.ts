import { Combat } from '../Enums/Combat'; 
import { AreaType } from '../Models/AreaType';
const { MAX_ATTACKING_DICE, MAX_DEFENDING_DICE } = Combat;

export class CombatValidator {
    private attackingArea: AreaType;
    private defendingArea: AreaType;
    constructor(attackingArea: AreaType, defendingArea: AreaType) {
        this.attackingArea = attackingArea;
        this.defendingArea = defendingArea;
    }

    isCombatValid(attackingDice: number, defendingDice: number): boolean {
        return (
            this.validateAttackingDice(attackingDice) &&
            this.validateDefendingDice(defendingDice) &&
            this.compareDice(attackingDice, defendingDice)
        );
    }

    validateAttackingDice(attackingDice: number): boolean {
        const attackingAreaUnits = this.attackingArea.getUnits();
        return (
            attackingAreaUnits > attackingDice &&
            attackingDice <= MAX_ATTACKING_DICE &&
            attackingDice > 0
        );
    }

    validateDefendingDice(defendingDice: number): boolean {
        const defendingAreaUnits = this.defendingArea.getUnits();
        return (
            defendingAreaUnits >= defendingDice &&
            defendingDice <= MAX_DEFENDING_DICE &&
            defendingDice > 0
        );
    }

    compareDice(attackingDice: number, defendingDice: number): boolean {
        return attackingDice >= defendingDice;
    }
}