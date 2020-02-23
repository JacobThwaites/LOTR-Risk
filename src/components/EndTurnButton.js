import React from "react";
import FormButton from './common/FormButton';

function EndTurnButton(props) {
  return (
    <FormButton 
      id='end-turn-button'
      label='End Turn'
      onClick={props.onEndTurnClick}
    />
  );
}

export default EndTurnButton;
