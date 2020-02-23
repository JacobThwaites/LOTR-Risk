import React from "react";
import FormButton from './common/FormButton';

function CombatButton(props) {
  return (
    <FormButton 
      id='combat-button'
      label='Handle Combat'
      onClick={props.onCombatButtonClick}
    />
  );
}

export default CombatButton;
