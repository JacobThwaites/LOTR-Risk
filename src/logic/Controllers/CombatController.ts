import { AreaType } from '../Models/AreaType';
import { CombatValidator } from '../Controllers/CombatValidator';

export class CombatController {
    private attackingArea: AreaType;
    private defendingArea: AreaType;
    constructor(attackingArea: AreaType, defendingArea: AreaType) {
        this.attackingArea = attackingArea;
        this.defendingArea = defendingArea;
    }

    handleCombat(attackingDiceUsed: number, defendingDiceUsed: number) {
        if (!this.isCombatValid(attackingDiceUsed, defendingDiceUsed)) {
            return;
        }
        
        // TODO: change these variable names
        const attackingDice = this.rollDice(attackingDiceUsed);
        const defendingDice = this.rollDice(defendingDiceUsed);
        
        for (let i = 0; i < defendingDice.length; i++) {
            if (i === 0) {
                this.firstDiceCombat(attackingDice[0], defendingDice[0]);
            } else {
                this.removeUnitsFromLoser(attackingDice[1], defendingDice[1]);
            }
        }
        
        this.checkDefendingUnitsRemaining();
    }

    isCombatValid(attackingDice: number, defendingDice: number): boolean {
        const combatValidator = new CombatValidator(this.attackingArea, this.defendingArea);
        return combatValidator.isCombatValid(attackingDice, defendingDice);
    } 

    rollDice(numberOfDice: number): Array<number> {
        let numbersRolled = [];
        for (let i = 0; i < numberOfDice; i++) {
            const number = this.getDiceRoll();
            numbersRolled.push(number); 
        }
        
        return numbersRolled.sort().reverse();
    }

    getDiceRoll(): number {
        const numberRolled = Math.floor(Math.random() * 6) + 1; 
        return numberRolled;
    }

    firstDiceCombat(attackingDice: number, defendingDice: number) {
        const defenderBonus = this.getDefenderDiceBonus(this.defendingArea);
        const attackerBonus = this.getAttackerDiceBonus(this.attackingArea);
        // TODO: remove + 6
        const attackerScore = attackingDice + attackerBonus + 6;
        const defenderScore = defendingDice + defenderBonus - 6;
        this.removeUnitsFromLoser(attackerScore, defenderScore);
    }

    getDefenderDiceBonus(defendingArea: AreaType): number {
        let bonus = 0;
        bonus += defendingArea.getDefendingBonus();

        if (defendingArea.getHasLeader()) {
            bonus += 1;
        }
        return bonus;
    }

    getAttackerDiceBonus(attackingArea: AreaType): number {
        let bonus = 0;
        if (attackingArea.getHasLeader()) {
            bonus += 1;
        }
        return bonus;
    }

    removeUnitsFromLoser(attackingRoll: number, defendingRoll: number) {  
        if (defendingRoll >= attackingRoll) {
            const attackingPlayer = this.attackingArea.getPlayer();
            if (attackingPlayer !== null) {
                attackingPlayer.removeUnits(1);
                this.attackingArea.removeUnits(1);
            }
        } else {
            const defendingPlayer = this.defendingArea.getPlayer();
            if (defendingPlayer !== null) {
                defendingPlayer.removeUnits(1);
                this.defendingArea.removeUnits(1);
            }
        }
    }

    secondDiceCombat(attackingDice: number, defendingDice: number) {
        this.removeUnitsFromLoser(attackingDice, defendingDice);
    }

    checkDefendingUnitsRemaining() {
        const attacker = this.attackingArea.getPlayer();

        if (!attacker) {
            return;
        }

        if (this.defendingArea.getUnits() < 1) {
            attacker.addArea(this.defendingArea);
            this.defendingArea.setPlayer(attacker);
        }
    }
}