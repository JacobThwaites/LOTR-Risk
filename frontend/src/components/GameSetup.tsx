import React, { useState } from "react";
import NumberOfPlayersSelector from "./NumberOfPlayersSelector";
import GameTypeSelector from "./GameTypeSelector";

type Props = {
  shouldDisplayChooseGameType: boolean, 
  numberOfPlayers: number,
  onSubmitGameType(gameType: string): void,
  onChangeNumberOfPlayers(number: number, b: any, a: { name: string; }): void,
  onSubmitNumberOfPlayers(): void,
  shouldDisplayNumberOfPlayersSelector: boolean
}

export default function GameSetup(props: Props): JSX.Element {
  const [gameType, setGameType] = useState<string>('online');

  function selectGameType(gameType: string) {
    setGameType(gameType);
  }

  function onSubmitGameType() {
    props.onSubmitGameType(gameType);
  }

  if (props.shouldDisplayChooseGameType) {
    return (
      <GameTypeSelector 
        gameType={gameType}
        selectGameType={selectGameType}
        onSubmitGameType={onSubmitGameType}
      />
    )
  }

  return (
    <NumberOfPlayersSelector
      numberOfPlayers={props.numberOfPlayers}
      onChange={props.onChangeNumberOfPlayers}
      onSubmit={props.onSubmitNumberOfPlayers}
    />
  );
}