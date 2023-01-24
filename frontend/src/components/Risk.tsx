import React, { Component } from "react";
import GameSetup from "./GameSetup";
import { Redirect } from "react-router";
import { generateURL } from "../logic/Controllers/URLGenerator";

type Props = {
};

type State = {
  numberOfPlayers: number,
  shouldDisplayChooseGameType: boolean
  shouldDisplayNumberOfPlayersSelector: boolean,
  shouldDisplayNameSelector: boolean,
  shouldDisplayGameSetup: boolean,
  playerName: string,
  gameType: string
};

export default class Risk extends Component<Props, State> {
  constructor( props: Props ) {
    super(props);
    this.state = {
      numberOfPlayers: 0,
      shouldDisplayChooseGameType: true,
      shouldDisplayNumberOfPlayersSelector: false,
      shouldDisplayNameSelector: false,
      shouldDisplayGameSetup: true,
      playerName: "",
      gameType: "online",
    };

    this.onNumberSelect = this.onNumberSelect.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmitNumberOfPlayers = this.onSubmitNumberOfPlayers.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onSubmitGameType = this.onSubmitGameType.bind(this);
  }

  onNumberSelect(number: number, b: any, a: {name: string}) {
    const { name } = a;
    const newState = { [name]: number } as unknown as Pick<State, keyof State>;
    this.setState(newState);
  }

  onChangeName(event: any) {
    const playerName = event.target.value;
    this.setState({ playerName });
  }

  onSubmitNumberOfPlayers() {
    this.setState({
      shouldDisplayNumberOfPlayersSelector: false,
      shouldDisplayNameSelector: true,
    });
  }

  onSubmitName() {
    this.setState({ shouldDisplayGameSetup: false });
  }

  onSubmitGameType(gameType: string) {
    this.setState({
      gameType,
      shouldDisplayChooseGameType: false,
      shouldDisplayNumberOfPlayersSelector: true,
    });
  }
  
  renderGameSetup() {
    const {
      numberOfPlayers,
      playerName,
      shouldDisplayNumberOfPlayersSelector,
      shouldDisplayChooseGameType,
    } = this.state;
    return (
      <GameSetup
        numberOfPlayers={numberOfPlayers}
        playerName={playerName}
        shouldDisplayChooseGameType={shouldDisplayChooseGameType}
        shouldDisplayNumberOfPlayersSelector={
          shouldDisplayNumberOfPlayersSelector
        }
        onChangeNumberOfPlayers={this.onNumberSelect}
        onSubmitNumberOfPlayers={this.onSubmitNumberOfPlayers}
        onChangeName={this.onChangeName}
        onSubmitPlayerName={this.onSubmitName}
        onSubmitGameType={this.onSubmitGameType}
      />
    );
  }

  renderGame() {
    const { numberOfPlayers, playerName } = this.state;
    const url = generateURL();
    return (
      <Redirect
        to={{
          pathname: url,
          state: { numberOfPlayers, playerName },
        }}
      />
    );
  }

  render() {
    const { shouldDisplayGameSetup } = this.state;

    if (shouldDisplayGameSetup) {
      return this.renderGameSetup();
    }

    return this.renderGame();
  }
}
