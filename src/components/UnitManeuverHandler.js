import React from "react";
import UnitInput from "./common/UnitInput";

function UnitManeuverHandler(props) {
  return (
    <div className="unit-maneuver-handler">
      <div>
        <UnitInput
          label="Unit Maneuvers"
          name="unitsToMove"
          max={props.max}
          onChange={props.onNumberSelect}
          value={props.unitsToMove}
        />
      </div>
      <button id='unit-maneuver-button' class='button' onClick={props.onMoveUnits}>
        move units
      </button>
    </div>
  );
}

export default UnitManeuverHandler;
