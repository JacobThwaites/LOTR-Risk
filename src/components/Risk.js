import React, { Component } from 'react';
import GameDisplay from './GameDisplay';

class Risk extends Component {
    constructor({ props }) {
        super(props);
        this.state = {
            numberOfPlayers: null,
            shouldDisplayPlayerSelector: true,
        }
    }

    renderPlayerSelector() {
        return (
            <h1>hello world</h1>
        ) 
    }

    render() {
        const { shouldDisplayPlayerSelector } = this.state;
        if (shouldDisplayPlayerSelector) {
            return this.renderPlayerSelector();
        }

        return (
            <GameDisplay />
        )
    }
}

export default Risk;