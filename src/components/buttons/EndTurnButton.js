import React from "react";
import FormButton from '../common/FormButton';

function EndTurnButton(props) {
  return (
    <div class='end-turn'>
      <FormButton 
        id='end-turn-button'
        label='End Turn'
        onClick={props.onEndTurnClick}
        disabled={props.disabled}
      />
    </div>
  );
}

export default EndTurnButton;
