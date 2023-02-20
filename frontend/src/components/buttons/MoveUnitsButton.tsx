import React from "react";
import FormButton from '../common/FormButton';

type Props = {
  onMoveUnits: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isDisabled: boolean
}

function MoveUnitsButtons(props: Props) {
  return (
    <FormButton 
      id='unit-maneuver-button'
      label='Move Units'
      onClick={props.onMoveUnits}
      disabled={props.isDisabled}
    />
  );
}

export default MoveUnitsButtons;