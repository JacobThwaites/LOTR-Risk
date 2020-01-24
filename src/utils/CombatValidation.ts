import { Area } from "../logic/Models/Area";

export default function isCombatInvalid(attackingDice: number, defendingDice: number, attackingArea: Area, defendingArea: Area): boolean {
    return ( 
        defendingDice > attackingDice || 
        attackingDice > attackingArea.getUnits() || 
        defendingDice <= defendingArea.getUnits() || 
        attackingDice > 3 ||
        defendingDice > 2
    )
}