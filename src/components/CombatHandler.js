import React from "react";
import CombatButton from './CombatButton';

function CombatHandler(props) {
  return (
    <div className='combat-handler'>
      <form className="diceInput">
        <label htmlFor="attackingDice">Attacking Dice</label>
        <input
          name="attackingDice"
          type="number"
          step="1"
          max="3"
          value={props.attackingDice}
          onChange={props.onInputFieldChange}
        />
        <label htmlFor="defendingDice">Defending Dice</label>
        <input
          name="defendingDice"
          type="number"
          step="1"
          max="2"
          value={props.defendingDice}
          onChange={props.onInputFieldChange}
        />
      </form>
      <CombatButton onCombatButtonClick={props.onCombatButtonClick} />
    </div>
  );
}

export default CombatHandler;
