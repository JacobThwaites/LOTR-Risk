import React, { Component } from "react";
import NumberOfPlayersSelector from "./NumberOfPlayersSelector";
import NameSelector from "./NameSelector";

class GameSetup extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      numberOfPlayers: null
    };
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
      shouldDisplayNumberOfPlayersSelector,
    } = this.props;

    if (shouldDisplayNumberOfPlayersSelector) {
        return this.renderNumberOfPlayerSelector();
    }
    
    return this.renderNameSelector();
  }
}

export default GameSetup;
