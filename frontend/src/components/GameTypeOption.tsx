import React from "react";
import RadioButtonIcon from "./common/RadioButtonIcon";

type Props = {
  value: string,
  gameType: string,
  icon: any,
  selectGameType: Function,
  label: string
}

function GameTypeOption(props: Props) {
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
