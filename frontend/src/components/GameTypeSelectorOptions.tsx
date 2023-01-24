import React from "react";
import { faGlobe, faDesktop } from '@fortawesome/free-solid-svg-icons'
import GameTypeOption from "./GameTypeOption";

type Props = {
  selectGameType: Function,
  gameType: string
}

export default function GameTypeSelectorOptions(props: Props) {
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