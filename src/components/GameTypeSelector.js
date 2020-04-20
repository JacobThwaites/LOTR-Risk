import React from "react";
import FormButton from "./common/FormButton";
import GameTypeSelectorOptions from "./GameTypeSelectorOptions";

function GameTypeSelector(props) {
  return (
    <div id="game-type-selector">
      <h1 id="game-type-selector--header">Select Game Type</h1>
      <GameTypeSelectorOptions 
        online={props.online}
        selectGameType={props.selectGameType}
        gameType={props.gameType}
      />
      <FormButton
        label="submit"
        disabled={!props.gameType}
        id="game-type-selector--button"
        onClick={props.onSubmitGameType}
      />
    </div>
  );
}

export default GameTypeSelector;
