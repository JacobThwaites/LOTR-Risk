import React from "react";
import CombatButton from "./CombatButton";
import UnitInput from "./common/UnitInput";

function CombatHandler(props) {
  return (
    <div className="combat-handler">
      <div className="combat-handler__diceInput--attacking">
        <UnitInput
          label="Attacking Dice"
          name="attackingDice"
          max={props.maxAttackingDice}
          value={props.attackingDice}
          onChange={props.onNumberSelect}
        />
      </div>
      <div className="combat-handler__diceInput--defending">
        <UnitInput
          label="Defending Dice"
          name="defendingDice"
          max={props.maxDefendingDice}
          value={props.defendingDice}
          onChange={props.onNumberSelect}
        />
      </div>
      <CombatButton onCombatButtonClick={props.onCombatButtonClick} />
    </div>
  );
}

export default CombatHandler;
