import React from "react";
import CustomButton from "../common/CustomButton";

type Props = {
  onCombatButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isDisabled: boolean
}

function CombatButton(props: Props) {
  return (
    <CustomButton 
      label='Handle Combat'
      onClick={props.onCombatButtonClick}
      disabled={props.isDisabled}
    
    />
  );
}

export default CombatButton;
