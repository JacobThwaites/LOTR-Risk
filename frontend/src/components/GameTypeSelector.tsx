import React from "react";
import FormButton from "./common/FormButton";
import GameTypeSelectorOptions from "./GameTypeSelectorOptions";

type Props = {
  selectGameType: Function,
  gameType: string
  onSubmitGameType: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function GameTypeSelector(props: Props) {
  return (
    <div id="game-type-selector" data-testid="game-type-selector">
      <h1 id="game-type-selector--header">Select Game Type</h1>
      <GameTypeSelectorOptions 
        selectGameType={props.selectGameType}
        gameType={props.gameType}
      />
      <FormButton
        label="submit"
        disabled={!props.gameType}
        id='game-type-selector--button'
        onClick={props.onSubmitGameType}
      />
    </div>
  );
}