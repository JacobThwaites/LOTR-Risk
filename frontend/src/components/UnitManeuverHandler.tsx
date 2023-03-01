import React, { Dispatch, SetStateAction } from "react";
import UnitInput from "./common/UnitInput";
import MoveUnitsButton from "./buttons/MoveUnitsButton";

type Props = {
  max: number,
  unitsToMove: number,
  onMoveUnits: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isButtonDisabled: boolean,
  setUnitsToMove: Dispatch<SetStateAction<number>>,
  isDisabled: boolean,
  isTroopTransfers: boolean
}

export default function UnitManeuverHandler(props: Props) {
  return (
    <div className="unit-maneuver-handler">
      <div>
        <UnitInput
          label={ props.isTroopTransfers ? '' : "Unit Maneuvers"}
          name="unitsToMove"
          max={props.max}
          onChange={(num: number) => props.setUnitsToMove(num)}
          value={props.unitsToMove}
          disabled={props.isDisabled}
        />
      </div>
      <MoveUnitsButton 
        onMoveUnits={props.onMoveUnits}
        isDisabled={props.isButtonDisabled}
      />
    </div>
  );
}