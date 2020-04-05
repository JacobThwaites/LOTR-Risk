import React from "react";
import CombatButton from "./buttons/CombatButton";
import CombatInputs from "./CombatInputs";

function CombatHandler(props) {
  return (
    <div className="combat-handler">
      <CombatInputs 
        maxAttackingDice={props.maxAttackingDice}
        attackingDice={props.attackingDice}
        maxDefendingDice={props.maxDefendingDice}
        defendingDice={props.defendingDice}
        onChange={props.onNumberSelect}
      />
      <CombatButton 
        onCombatButtonClick={props.onCombatButtonClick} 
        isDisabled={!props.isCombatButtonClickable}
      />
    </div>
  );
}

export default CombatHandler;
