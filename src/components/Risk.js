import React, { Component } from 'react';
import PlayerSelector from './PlayerSelector';
import GameDisplay from './GameDisplay';

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
        this.onSubmit = this.onSubmit.bind(this);
    }

    onNumberSelect(number, b, a) {
        const { name } = a;
        this.setState({ [name]: number });
      }

    onSubmit() {
        this.setState({ 
            shouldDisplayPlayerSelector: false,
            shouldDisplayNameSelector: true,
        });
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
                onSubmit={this.onSubmit}
            />
        )
    }

    renderNameSelector() {
        return (
            <h1>name selector</h1>
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