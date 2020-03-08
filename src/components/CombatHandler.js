import React from "react";
import CombatButton from "./CombatButton";
import NumberSelector from "./common/NumberSelector";

function CombatHandler(props) {
  return (
    <div className="combat-handler">
        <div className="combat-handler__diceInput--attacking">
          <label htmlFor="attackingDice">Attacking Dice</label>
          <NumberSelector
            name="attackingDice"
            max="3"
            value={props.attackingDice}
            onChange={props.onNumberSelect}
          />
        </div>
        <div className="combat-handler__diceInput--defending">
          <label htmlFor="defendingDice">Defending Dice</label>
          <NumberSelector
            name="defendingDice"
            max="2"
            value={props.defendingDice}
            onChange={props.onNumberSelect}
          />
        </div>
      <CombatButton onCombatButtonClick={props.onCombatButtonClick} />
    </div>
  );
}

export default CombatHandler;
