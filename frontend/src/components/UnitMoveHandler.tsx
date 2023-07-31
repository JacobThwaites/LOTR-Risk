import React, { Dispatch, SetStateAction } from "react";
import UnitInput from "./common/UnitInput";
import MoveUnitsButton from "./buttons/MoveUnitsButton";
import { AreaName } from "../gameLogic/Enums/AreaNames";
import areaDetails from "./svgPaths/AreaDetails";

type Props = {
  areaToMoveUnits: AreaName | null,
  unitsToMove: number,
  onMoveUnits: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  setUnitsToMove: Dispatch<SetStateAction<number>>,
  isInputDisabled: boolean,
  label: string,
}

export default function UnitMoveHandler(props: Props) {
  let maxUnits = 0;
  
  if (props.areaToMoveUnits) {
    const areaDetail = areaDetails[props.areaToMoveUnits];
    maxUnits = areaDetail.units - 1;
  }

  return (
    <div className="unit-maneuver-handler">
      <div className="unit-maneuver-handler--input">
        <label>{props.label}</label>
        <UnitInput
          name="unitsToMove"
          max={maxUnits}
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