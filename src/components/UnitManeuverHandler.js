import React from "react";

function UnitManeuverHandler(props) {
  return (
    <form className="diceInput">
      <label htmlFor="unitsToMove">Unit Maneuvers</label>
      <input
        name="unitsToMove"
        type="number"
        step="1"
        min="1"
        max={props.max}
        onChange={props.onInputFieldChange}
        value={props.unitsToMove}
      />
      <button onClick={props.onMoveUnits} >move units</button>
    </form>
  );
}

export default UnitManeuverHandler;
