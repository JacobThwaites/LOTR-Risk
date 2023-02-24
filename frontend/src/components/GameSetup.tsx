import React, { Component } from "react";
import NumberOfPlayersSelector from "./NumberOfPlayersSelector";
import GameTypeSelector from "./GameTypeSelector";

type Props = {
  onSubmitGameType: Function,
  numberOfPlayers: number,
  onChangeNumberOfPlayers: Function,
  onSubmitNumberOfPlayers: Function,
  shouldDisplayChooseGameType: boolean,
  shouldDisplayNumberOfPlayersSelector: boolean
}

type State = {
  numberOfPlayers: number | null,
  gameType: string
}

export default class GameSetup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      numberOfPlayers: null,
      gameType: 'online',
    };

    this.selectGameType = this.selectGameType.bind(this);
    this.onSubmitGameType = this.onSubmitGameType.bind(this);
  }

  selectGameType(gameType: string) {
    this.setState({ gameType });
  }

  onSubmitGameType() {
    const { gameType } = this.state;
    this.props.onSubmitGameType(gameType);
  }

  renderChooseGameType() {
    const { gameType } = this.state;
    return (
      <GameTypeSelector 
        gameType={gameType}
        selectGameType={this.selectGameType}
        onSubmitGameType={this.onSubmitGameType}
      />
    )
  }

  renderNumberOfPlayerSelector() {
    const { numberOfPlayers } = this.props;
    return (
      <NumberOfPlayersSelector
        numberOfPlayers={numberOfPlayers}
        onChange={this.props.onChangeNumberOfPlayers}
        onSubmit={this.props.onSubmitNumberOfPlayers}
      />
    );
  }

  render() {
    const {
      shouldDisplayChooseGameType,
    } = this.props;

    if (shouldDisplayChooseGameType) {
      return this.renderChooseGameType();
    }

    return this.renderNumberOfPlayerSelector();
  }
}