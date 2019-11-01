import { Player } from '../Models/Player';
import { Area } from '../Models/Area';

export class CombatController {
    private attacker: Player;
    private defender: Player;
    private attackingArea: Area;
    private defendingArea: Area;
    constructor(attacker: Player, defender: Player, attackingArea: Area, defendingArea: Area) {
        this.attacker = attacker;
        this.defender = defender;
        this.attackingArea = attackingArea;
        this.defendingArea = defendingArea;
    }

    handleCombat(attackingDiceUsed: number, defendingDiceUsed: number) {
        const attackingDice = this.attacker.rollDice(attackingDiceUsed);
        const defendingDice = this.defender.rollDice(defendingDiceUsed);
        for (let i = 0; i < defendingDice.length; i++) {
            if (i === 0) {
                this.firstDiceCombat(attackingDice[0], defendingDice[0]);
            } else {
                this.removeUnitsFromLoser(attackingDice[1], defendingDice[1]);
            }
        }
    }

    firstDiceCombat(attackingDice: number, defendingDice: number) {
        const defenderBonus = this.getDefenderDiceBonus(this.defendingArea);
        const attackerBonus = this.getAttackerDiceBonus(this.attackingArea);
        const attackerScore = attackingDice + attackerBonus;
        const defenderScore = defendingDice + defenderBonus;
        this.removeUnitsFromLoser(attackerScore, defenderScore)
    }

    getDefenderDiceBonus(defendingArea: Area): number {
        let bonus = 0;
        if (defendingArea.getIsStronghold()) {
            bonus += 1;
        }
        if (defendingArea.getHasLeader()) {
            bonus += 1;
        }
        return bonus;
    }

    getAttackerDiceBonus(attackingArea: Area): number {
        let bonus = 0;
        if (attackingArea.getHasLeader()) {
            bonus += 1;
        }
        return bonus;
    }

    removeUnitsFromLoser(attackingRoll: number, defendingRoll: number) {
        if (defendingRoll >= attackingRoll) {
            this.attacker.removeUnits(1);
            this.attackingArea.removeUnits(1);
        } else {
            this.defender.removeUnits(1);
            this.defendingArea.removeUnits(1);
        }
    }
}
