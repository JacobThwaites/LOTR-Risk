import React, { Component } from "react";
import NumberOfPlayersSelector from "./NumberOfPlayersSelector";
import NameSelector from "./NameSelector";
import GameTypeSelector from "./GameTypeSelector";

class GameSetup extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      numberOfPlayers: null
    };
  }

  renderChooseGameType() {
    return (
      <GameTypeSelector />
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

export default GameSetup;
