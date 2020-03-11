import React, { Component } from 'react';
import PlayerSelector from './PlayerSelector';
import GameDisplay from './GameDisplay';

class Risk extends Component {
    constructor({ props }) {
        super(props);
        this.state = {
            numberOfPlayers: null,
            shouldDisplayPlayerSelector: true,
        }

        this.onNumberSelect = this.onNumberSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onNumberSelect(number, b, a) {
        const { name } = a;
        this.setState({ [name]: number });
      }

    onSubmit() {
        this.setState({ shouldDisplayPlayerSelector: false });
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

    render() {
        const { shouldDisplayPlayerSelector, numberOfPlayers } = this.state;
        if (shouldDisplayPlayerSelector) {
            return this.renderPlayerSelector();
        }

        return (
            <GameDisplay 
                numberOfPlayers={numberOfPlayers}
            />
        )
    }
}

export default Risk;