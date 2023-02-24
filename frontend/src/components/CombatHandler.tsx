import React, { Dispatch, SetStateAction } from "react";
import CombatButton from "./buttons/CombatButton";
import CombatInputs from "./CombatInputs";

type Props = {
  maxAttackingDice: number,
  attackingDice: number,
  maxDefendingDice: number,
  defendingDice: number,
  setAttackingDice: Dispatch<SetStateAction<number>>,
  setDefendingDice: Dispatch<SetStateAction<number>>,
  onCombatButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isCombatButtonClickable: boolean,
  isUsersTurn: boolean
}

export default function CombatHandler(props: Props) {
  return (
    <div className="combat-handler">
      <CombatInputs 
        maxAttackingDice={props.maxAttackingDice}
        attackingDice={props.attackingDice}
        maxDefendingDice={props.maxDefendingDice}
        defendingDice={props.defendingDice}
        setAttackingDice={props.setAttackingDice}
        setDefendingDice={props.setDefendingDice}
        areInputsDisabled={props.isUsersTurn}
      />
      <CombatButton 
        onCombatButtonClick={props.onCombatButtonClick} 
        isDisabled={!props.isCombatButtonClickable}
      />
    </div>
  );
}