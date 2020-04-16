import React, { Component } from 'react';
import PlayerSelector from './PlayerSelector';
import GameDisplay from './GameDisplay';
import NameSelector from './NameSelector';

class Risk extends Component {
    constructor({ props }) {
        super(props);
        this.state = {
            numberOfPlayers: null,
            shouldDisplayPlayerSelector: true,
            shouldDisplayNameSelector: false,
            playerName: '',
        }

        this.onNumberSelect = this.onNumberSelect.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmitNumberOfPlayers = this.onSubmitNumberOfPlayers.bind(this);
        this.onSubmitPlayerName = this.onSubmitPlayerName.bind(this);
    }

    onNumberSelect(number, b, a) {
        const { name } = a;
        this.setState({ [name]: number });
    }

    onChangeName(event) {
        const playerName = event.target.value;
        console.log(playerName);
        this.setState({ playerName });
    }

    onSubmitNumberOfPlayers() {
        this.setState({ 
            shouldDisplayPlayerSelector: false,
            shouldDisplayNameSelector: true,
        });
    }

    onSubmitPlayerName() {
        this.setState({ shouldDisplayNameSelector: false });
    }

    shouldDisplayNameSelector() {
        const { shouldDisplayPlayerSelector, playerName } = this.state;
        return !shouldDisplayPlayerSelector && !playerName;
    }

    renderPlayerSelector() {
        const { numberOfPlayers } = this.state;
        return (
            <PlayerSelector 
                numberOfPlayers={numberOfPlayers}
                onChange={this.onNumberSelect}
                onSubmit={this.onSubmitNumberOfPlayers}
            />
        )
    }

    renderNameSelector() {
        const { playerName } = this.state;
        return (
            <NameSelector 
                playerName={playerName}
                onChangeName={this.onChangeName}
                onSubmit={this.onSubmitPlayerName}
            />
        )
    }

    render() {
        const { shouldDisplayPlayerSelector, shouldDisplayNameSelector, numberOfPlayers } = this.state;
        if (shouldDisplayPlayerSelector) {
            return this.renderPlayerSelector();
        }

        if (shouldDisplayNameSelector) {
            return this.renderNameSelector();
        }

        return (
            <GameDisplay 
                numberOfPlayers={numberOfPlayers}
            />
        )
    }
}

export default Risk;