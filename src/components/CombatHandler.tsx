import React from "react";
import CombatButton from "./buttons/CombatButton";
import CombatInputs from "./CombatInputs";

type Props = {
  maxAttackingDice: number,
  attackingDice: number,
  maxDefendingDice: number,
  defendingDice: number,
  onNumberSelect: Function,
  onCombatButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isCombatButtonClickable: boolean
}

export default function CombatHandler(props: Props) {
  return (
    <div className="combat-handler">
      <CombatInputs 
        maxAttackingDice={props.maxAttackingDice}
        attackingDice={props.attackingDice}
        maxDefendingDice={props.maxDefendingDice}
        defendingDice={props.defendingDice}
        onNumberSelect={props.onNumberSelect}
      />
      <CombatButton 
        onCombatButtonClick={props.onCombatButtonClick} 
        isDisabled={!props.isCombatButtonClickable}
      />
    </div>
  );
}