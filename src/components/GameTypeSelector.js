import React from "react";
import FormButton from "./common/FormButton";
import GameTypeSelectorOptions from "./GameTypeSelectorOptions";

function GameTypeSelector(props) {
  return (
    <div id="game-type-selector">
      <h1 id="game-type-selector--header">select game type</h1>
      <GameTypeSelectorOptions 
        online={props.online}
      />
      <FormButton
        label="submit"
        disabled={!props.gameType}
        id="game-type-selector--button"
      />
    </div>
  );
}

export default GameTypeSelector;
