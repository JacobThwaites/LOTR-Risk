import React from "react";
import CustomButton from "../common/CustomButton";

type Props = {
  onMoveUnits: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isDisabled: boolean
}

function MoveUnitsButtons(props: Props) {
  return (
    <CustomButton 
      label='Move Units'
      onClick={props.onMoveUnits}
      disabled={props.isDisabled}
    />
  );
}

export default MoveUnitsButtons;