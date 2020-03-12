import React from "react";
import FormButton from '../common/FormButton';

function MoveUnitsButtons(props) {
  return (
    <FormButton 
      id='unit-maneuver-button'
      label='move units'
      onClick={props.onMoveUnits}
      disabled={props.isDisabled}
    />
  );
}

export default MoveUnitsButtons;
