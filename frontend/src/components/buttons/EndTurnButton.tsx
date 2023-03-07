import React from "react";
import CustomButton from "../common/CustomButton";

type Props = {
  onEndTurnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isDisabled: boolean,
  shouldDisplayTroopTransferButton: boolean
}

function EndTurnButton(props: Props) {
  return (
    <div className='end-turn'>
      <CustomButton 
        label={props.shouldDisplayTroopTransferButton ? 'Skip Troop Transfer' : 'End Turn'}
        onClick={props.onEndTurnClick}
        disabled={props.isDisabled} 
      />
    </div>
  );
}

export default EndTurnButton;
