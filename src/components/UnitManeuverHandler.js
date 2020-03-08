import React from "react";
import NumberSelector from "./common/NumberSelector";

function UnitManeuverHandler(props) {
  return (
    <div className="unit-maneuver-handler">
      <label>Unit Maneuvers</label>
      <NumberSelector 
        name='unitsToMove'
        max={props.max}
        onChange={props.onNumberSelect}
        value={props.unitsToMove}
      />
      <button onClick={props.onMoveUnits} >move units</button>
    </div>
  );
}

export default UnitManeuverHandler;
