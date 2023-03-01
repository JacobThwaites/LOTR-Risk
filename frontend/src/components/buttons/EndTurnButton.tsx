import React from "react";
import FormButton from '../common/FormButton';

type Props = {
  onEndTurnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isDisabled: boolean,
  shouldDisplayTroopTransferButton: boolean
}

function EndTurnButton(props: Props) {
  return (
    <div className='end-turn'>
      <FormButton
        id='end-turn-button'
        label={props.shouldDisplayTroopTransferButton ? 'Skip Troop Transfer' : 'End Turn'}
        onClick={props.onEndTurnClick}
        disabled={props.isDisabled}
      />
    </div>
  );
}

export default EndTurnButton;
