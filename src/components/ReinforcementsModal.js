import React from "react";

function ReinforcementsModal(props) {
  return (
    <>
      <label for="attackingDice">Attacking Dice</label>
      <input
        name="attackingDice"
        type="number"
        step="1"
        max="3"
        value={props.reinforcementsAvailable}
      />
    </>
  );
}

export default ReinforcementsModal;
