import React, { Component } from 'react';
import GameSetup from './GameSetup';
import { Redirect } from 'react-router';
import { URLGenerator } from '../logic/Controllers/URLGenerator';


class Risk extends Component {
    constructor({ props }) {
        super(props);
        this.state = {
            numberOfPlayers: null,
            shouldDisplayChooseGameType: true,
            shouldDisplayNumberOfPlayersSelector: false,
            shouldDisplayNameSelector: false,
            shouldDisplayGameSetup: true,
            playerName: '',
            gameType: 'online'
        }

        this.onNumberSelect = this.onNumberSelect.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmitNumberOfPlayers = this.onSubmitNumberOfPlayers.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);
        this.onSubmitGameType = this.onSubmitGameType.bind(this);
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

    onSubmitGameType(gameType) {
        this.setState({ 
            gameType, 
            shouldDisplayChooseGameType: false,
            shouldDisplayNumberOfPlayersSelector: true
        });
    }

    generateURL() {
        const { numberOfPlayers } = this.state;
        const urlGenerator = new URLGenerator(numberOfPlayers);
        const url = urlGenerator.generateURL();
        return url; 
    }

    renderGameSetup() {
        const { 
            numberOfPlayers, 
            playerName, 
            shouldDisplayNumberOfPlayersSelector,
            shouldDisplayChooseGameType,
            gameType
        } = this.state;
        return (
            <GameSetup 
                numberOfPlayers={numberOfPlayers}
                playerName={playerName}
                gameType={gameType}
                shouldDisplayChooseGameType={shouldDisplayChooseGameType}
                shouldDisplayNumberOfPlayersSelector={shouldDisplayNumberOfPlayersSelector}
                onChangeNumberOfPlayers={this.onNumberSelect}
                onSubmitNumberOfPlayers={this.onSubmitNumberOfPlayers}
                onChangeName={this.onChangeName}
                onSubmitPlayerName={this.onSubmitName}
                onSubmitGameType={this.onSubmitGameType}
            />
        )
    }

    renderGame() {
        const { numberOfPlayers, playerName } = this.state;
        const url = this.generateURL();
        return <Redirect to={{
            pathname: url,
            state: { numberOfPlayers, playerName }
        }}/>;
    }

    render() {
        const { 
            shouldDisplayGameSetup
        } = this.state;

        if (shouldDisplayGameSetup) {
            return this.renderGameSetup();
        }

        return this.renderGame();
    }
}

export default Risk;