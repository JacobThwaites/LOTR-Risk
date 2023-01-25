import React from "react";
import UnitInput from "./common/UnitInput";
import MoveUnitsButton from "./buttons/MoveUnitsButton";

type Props = {
  max: number,
  onNumberSelect: Function, 
  unitsToMove: number,
  onMoveUnits: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isButtonDisabled: boolean
}

export default function UnitManeuverHandler(props: Props) {
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