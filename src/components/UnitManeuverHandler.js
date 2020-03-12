import React from "react";
import UnitInput from "./common/UnitInput";
import MoveUnitsButton from "./buttons/MoveUnitsButton";

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
      <MoveUnitsButton 
        onMoveUnits={props.onMoveUnits}
        isDisabled={props.isButtonDisabled}
      />
    </div>
  );
}

export default UnitManeuverHandler;
