import React from "react";
import CombatButton from './CombatButton';

function CombatHandler(props) {
  return (
    <>
      <CombatButton onCombatButtonClick={props.onCombatButtonClick} />
      <form class="diceInput">
        <label for="attackingDice">Attacking Dice</label>
        <input
          name="attackingDice"
          type="number"
          step="1"
          value={props.attackingDice}
          onChange={props.onInputFieldChange}
        />
        <label for="defendingDice">Defending Dice</label>
        <input
          name="defendingDice"
          type="text"
          value={props.defendingDice}
          onChange={props.onInputFieldChange}
        />
      </form>
    </>
  );
}

export default CombatHandler;
