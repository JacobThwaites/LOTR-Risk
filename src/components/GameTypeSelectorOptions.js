import React from "react";
import RadioButtonIcon from "./common/RadioButtonIcon";
import { faGlobe, faDesktop } from '@fortawesome/free-solid-svg-icons'

function GameTypeSelectorOptions(props) {
  return (
    <div id="game-type-selector--options">
        <RadioButtonIcon 
            id="game-type-selector--option_online"
            value='online'
            checked={props.gameType === 'online'}
            icon={faGlobe}
            onClick={props.selectGameType}
        />
        <RadioButtonIcon 
            id="game-type-selector--option_local"
            value='local'
            checked={props.gameType === 'local'}
            icon={faDesktop}
            onClick={props.selectGameType}
        />
    </div>
  );
}

export default GameTypeSelectorOptions;
