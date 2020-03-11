import { Area } from '../Models/Area';
import { Combat } from '../Enums/Combat'; 
const { MAX_ATTACKING_DICE, MAX_DEFENDING_DICE } = Combat;

export class CombatValidator {
    private attackingArea: Area;
    private defendingArea: Area;
    constructor(attackingArea: Area, defendingArea: Area) {
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
        console.log(attackingDice, attackingAreaUnits);
        
        return (
            attackingAreaUnits > attackingDice &&
            attackingDice <= MAX_ATTACKING_DICE &&
            attackingDice > 0
        );
    }

    validateDefendingDice(defendingDice: number): boolean {
        const defendingAreaUnits = this.defendingArea.getUnits();
        console.log(defendingDice, defendingAreaUnits);
        
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