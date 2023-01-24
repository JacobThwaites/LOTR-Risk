import React, { Component } from "react";
import NumberOfPlayersSelector from "./NumberOfPlayersSelector";
import NameSelector from "./NameSelector";
import GameTypeSelector from "./GameTypeSelector";

type Props = {
  onSubmitGameType: Function,
  numberOfPlayers: number,
  onChangeNumberOfPlayers: Function,
  onSubmitNumberOfPlayers: Function,
  playerName: string,
  onChangeName: Function,
  onSubmitPlayerName: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
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

  renderNameSelector() {
    const { playerName } = this.props;
    return (
      <NameSelector
        playerName={playerName}
        onChangeName={this.props.onChangeName}
        onSubmit={this.props.onSubmitPlayerName}
      />
    );
  }

  render() {
    const {
      shouldDisplayChooseGameType,
      shouldDisplayNumberOfPlayersSelector,
    } = this.props;

    if (shouldDisplayChooseGameType) {
      return this.renderChooseGameType();
    }

    if (shouldDisplayNumberOfPlayersSelector) {
        return this.renderNumberOfPlayerSelector();
    }
    
    return this.renderNameSelector();
  }
}