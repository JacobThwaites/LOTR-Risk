import { Combat } from '../Enums/Combat';
import { AreaType } from '../Models/AreaType';
import { Game } from '../Models/Game';

export class CombatController {
    private attackingArea: AreaType;
    private defendingArea: AreaType;
    private game: Game;
    constructor(attackingArea: AreaType, defendingArea: AreaType, game: Game) {
        this.attackingArea = attackingArea;
        this.defendingArea = defendingArea;
        this.game = game;
    }

    public getCombatResults(numAttackingDice: number) {
        const numDefendingDice = this.getMaxDefendingDice(numAttackingDice);
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

    public handleResults(results: string[]) {
        for (let i = 0; i < results.length; i++) {
            if (results[i] === 'attacker') {
                this.removeUnitsFromLoser(this.defendingArea);
            } else {
                this.removeUnitsFromLoser(this.attackingArea);
            }
        }

        this.checkDefendingUnitsRemaining();
    }


    private firstDiceCombat(attackingDice: number, defendingDice: number) {
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

    private secondDiceCombat(attackerScore: number, defenderScore: number) {
        if (attackerScore > defenderScore) {
            return 'attacker';
        } else {
            return 'defender';
        }
    }

    private removeUnitsFromLoser(losingArea: AreaType) {
        const losingPlayer = losingArea.getPlayer();
        losingPlayer!.removeUnits(1);
        losingArea.removeUnits(1);
    }

    private rollDice(numberOfDice: number): Array<number> {
        let numbersRolled = [];
        for (let i = 0; i < numberOfDice; i++) {
            const number = this.getDiceRoll();
            numbersRolled.push(number);
        }

        return numbersRolled.sort().reverse();
    }

    private getDiceRoll(): number {
        const numberRolled = Math.floor(Math.random() * 6) + 1;
        return numberRolled;
    }

    private getDefenderDiceBonus(defendingArea: AreaType): number {
        let bonus = 0;
        bonus += defendingArea.getDefendingBonus();

        if (defendingArea.getHasLeader()) {
            bonus += 1;
        }
        return bonus;
    }

    private getAttackerDiceBonus(attackingArea: AreaType): number {
        let bonus = 0;
        if (attackingArea.getHasLeader()) {
            bonus += 1;
        }
        return bonus;
    }

    private checkDefendingUnitsRemaining() {
        const attacker = this.attackingArea.getPlayer();

        if (!attacker) {
            return;
        }

        if (this.defendingArea.getUnits() < 1) {
            attacker.addArea(this.defendingArea);
            this.defendingArea.setPlayer(attacker);
            this.game.handlePlayerCapturingArea();
        }
    }

    private getMaxDefendingDice(attackingDice: number): number {
        const { MAX_DEFENDING_DICE } = Combat;
        return Math.min(attackingDice, this.defendingArea.getUnits(), MAX_DEFENDING_DICE);
    }
}