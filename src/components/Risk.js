import React, { Component } from 'react';
import GameDisplay from './GameDisplay';
import GameSetup from './GameSetup';
import { Redirect } from 'react-router';


class Risk extends Component {
    constructor({ props }) {
        super(props);
        this.state = {
            numberOfPlayers: null,
            shouldDisplayNumberOfPlayersSelector: true,
            shouldDisplayNameSelector: false,
            shouldDisplayGameSetup: true,
            playerName: '',
        }

        this.onNumberSelect = this.onNumberSelect.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmitNumberOfPlayers = this.onSubmitNumberOfPlayers.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);
    }

    onNumberSelect(number, b, a) {
        const { name } = a;
        this.setState({ [name]: number });
    }

    onChangeName(event) {
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

    startGame() {

    }

    renderGameSetup() {
        const { numberOfPlayers, playerName, shouldDisplayNumberOfPlayersSelector } = this.state;
        return (
            <GameSetup 
                numberOfPlayers={numberOfPlayers}
                playerName={playerName}
                shouldDisplayNumberOfPlayersSelector={shouldDisplayNumberOfPlayersSelector}
                onChangeNumberOfPlayers={this.onNumberSelect}
                onSubmitNumberOfPlayers={this.onSubmitNumberOfPlayers}
                onChangeName={this.onChangeName}
                onSubmitPlayerName={this.onSubmitName}
            />
        )
    }

    render() {
        const { 
            numberOfPlayers, 
            playerName,
            shouldDisplayGameSetup
        } = this.state;

        if (shouldDisplayGameSetup) {
            return this.renderGameSetup();
        }

        return <Redirect to={{
            pathname: '/game',
            state: { numberOfPlayers, playerName }
        }}/>;
    }
}

export default Risk;