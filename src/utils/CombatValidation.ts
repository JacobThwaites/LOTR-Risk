import { Area } from "../logic/Models/Area";

export default function isCombatInvalid(attackingDice: number, defendingDice: number, attackingArea: Area, defendingArea: Area): boolean {
    const maxAttackingDiceAllowed = 3;
    const maxDefendingDiceAllowed = 2;
    return ( 
        defendingDice > attackingDice || 
        attackingDice >= attackingArea.getUnits() || 
        defendingDice > defendingArea.getUnits() || 
        attackingDice > maxAttackingDiceAllowed ||
        defendingDice > maxDefendingDiceAllowed
    )
}