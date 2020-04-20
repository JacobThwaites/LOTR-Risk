import React from "react";
import { faGlobe, faDesktop } from '@fortawesome/free-solid-svg-icons'
import GameTypeOption from "./GameTypeOption";

function GameTypeSelectorOptions(props) {
  return (
    <div id="game-type-selector--options">
        <GameTypeOption 
            label='Online'
            value='online'
            icon={faGlobe}
            selectGameType={props.selectGameType}
            gameType={props.gameType}
        />
        <GameTypeOption 
            label='Local'
            value='local'
            icon={faDesktop}
            selectGameType={props.selectGameType}
            gameType={props.gameType}
        />
    </div>
  );
}

export default GameTypeSelectorOptions;
