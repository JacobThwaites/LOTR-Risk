import React from "react";
import FormButton from '../common/FormButton';

type Props = {
  onCombatButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isDisabled: boolean
}

function CombatButton(props: Props) {
  return (
    <FormButton 
      id='combat-button'
      label='Handle Combat'
      onClick={props.onCombatButtonClick}
      disabled={props.isDisabled}
    />
  );
}

export default CombatButton;
