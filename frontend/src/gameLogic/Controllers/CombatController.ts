import { AreaType } from '../Models/AreaType';
import { CombatValidator } from './CombatValidator';

export class CombatController {
    private attackingArea: AreaType;
    private defendingArea: AreaType;
    constructor(attackingArea: AreaType, defendingArea: AreaType) {
        this.attackingArea = attackingArea;
        this.defendingArea = defendingArea;
    }

    getCombatResults(numAttackingDice: number, numDefendingDice: number) {
        const results = [];
        const attackingDice = this.rollDice(numAttackingDice);
        const defendingDice = this.rollDice(numDefendingDice);
        
        const firstResult = this.firstDiceCombat(attackingDice[0], defendingDice[0]);
        results.push(firstResult);

        if (numDefendingDice > 1) {
            const secondResult = this.secondDiceCombat(attackingDice[0], defendingDice[0]);
            results.push(secondResult);
        }

        return results;
    }

    firstDiceCombat(attackingDice: number, defendingDice: number) {
        const defenderBonus = this.getDefenderDiceBonus(this.defendingArea);
        const attackerBonus = this.getAttackerDiceBonus(this.attackingArea);
        // TODO: remove + 6
        const attackerScore = attackingDice + attackerBonus + 6;
        const defenderScore = defendingDice + defenderBonus - 6;
        if (attackerScore > defenderScore) {
            return 'attacker';
        } else {
            return 'defender';
        }
    }

    secondDiceCombat(attackerScore: number, defenderScore: number) {
        if (attackerScore > defenderScore) {
            return 'attacker';
        } else {
            return 'defender';
        }
    }

    handleResults(results: string[]) {
        for (let i = 0; i < results.length; i++) {
            if (results[i] === 'attacker') {
                this.removeUnitsFromLoser(this.defendingArea);
            } else {
                this.removeUnitsFromLoser(this.attackingArea);
            }  
        }

        this.checkDefendingUnitsRemaining();
    }

    removeUnitsFromLoser(losingArea: AreaType) {
        const losingPlayer = losingArea.getPlayer();
        losingPlayer!.removeUnits(1);
        losingArea.removeUnits(1);
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