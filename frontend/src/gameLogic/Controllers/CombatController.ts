import areaDetails from '../../components/svgPaths/AreaDetails';
import { AreaName } from '../Enums/AreaNames';
import { Game } from '../Models/Game';

export class CombatController {
    private attackingArea: AreaName;
    private defendingArea: AreaName;
    private game: Game;
    constructor(attackingArea: AreaName, defendingArea: AreaName, game: Game) {
        this.attackingArea = attackingArea;
        this.defendingArea = defendingArea;
        this.game = game;
    }

    public getCombatResults(numAttackingDice: number, numDefendingDice: number) {
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

    private removeUnitsFromLoser(losingAreaName: AreaName) {
        const losingArea = areaDetails[losingAreaName].area;

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

    private getDefenderDiceBonus(defendingAreaName: AreaName): number {
        const areaDetail = areaDetails[defendingAreaName];
        const defendingArea = areaDetail.area;

        let bonus = 0;
        bonus += defendingArea.getDefendingBonus();

        if (defendingArea.getHasLeader()) {
            bonus += 1;
        }
        return bonus;
    }

    private getAttackerDiceBonus(attackingAreaName: AreaName): number {
        const attackingArea = areaDetails[attackingAreaName].area;

        let bonus = 0;
        if (attackingArea.getHasLeader()) {
            bonus += 1;
        }
        return bonus;
    }

    private checkDefendingUnitsRemaining() {
        const areaDetail = areaDetails[this.attackingArea];
        const attackingArea = areaDetail.area;
        const attacker = attackingArea.getPlayer();

        if (!attacker) {
            return;
        }

        const defendingAreaDetail = areaDetails[this.defendingArea];

        if (defendingAreaDetail.units < 1) {
            attacker.addArea(defendingAreaDetail.area);
            defendingAreaDetail.area.setPlayer(attacker);
            this.game.handlePlayerCapturingArea();
        }
    }
}