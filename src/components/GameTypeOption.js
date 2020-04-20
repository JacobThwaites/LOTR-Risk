import React from "react";
import RadioButtonIcon from "./common/RadioButtonIcon";

function GameTypeOption(props) {
  return (
    <div className="game-type-selector--option">
      <RadioButtonIcon
        id={`game-type-selector--option_${props.value}`}
        value={props.value}
        checked={props.gameType === props.value}
        icon={props.icon}
        onClick={props.selectGameType}
      />
      <label>{props.label}</label>
    </div>
  );
}

export default GameTypeOption;
