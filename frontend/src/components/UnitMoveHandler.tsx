import React, { Dispatch, SetStateAction } from "react";
import UnitInput from "./common/UnitInput";
import MoveUnitsButton from "./buttons/MoveUnitsButton";

type Props = {
  max: number,
  unitsToMove: number,
  onMoveUnits: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  setUnitsToMove: Dispatch<SetStateAction<number>>,
  isInputDisabled: boolean,
  label: string,
  isInputEnabled: boolean
}

export default function UnitMoveHandler(props: Props) {
  return (
    <div className="unit-maneuver-handler">
      <div className="unit-maneuver-handler--input">
        <label>{props.label}</label>
        <UnitInput
          name="unitsToMove"
          max={props.max}
          onChange={(num: number) => props.setUnitsToMove(num)}
          value={props.unitsToMove}
          disabled={props.isInputDisabled}
        />
      </div>
      <MoveUnitsButton
        onMoveUnits={props.onMoveUnits}
        isDisabled={props.isInputDisabled}
      />
    </div>
  );
}