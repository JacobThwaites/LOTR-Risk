import React from "react";
import RadioButtonIcon from "./common/RadioButtonIcon";

function GameTypeSelectorOptions(props) {
  return (
    <div id="game-type-selector--options">
        <RadioButtonIcon 
            id="game-type-selector--option_online"
            value={props.online}
            checked={props.online}
        />
        <RadioButtonIcon 
            id="game-type-selector--option_local"
            value={props.local}
            checked={props.local}
        />
    </div>
  );
}

export default GameTypeSelectorOptions;
