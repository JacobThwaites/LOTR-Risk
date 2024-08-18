import React, { useEffect, useState } from "react";
import GameSetup from "./GameSetup";
import { Redirect } from "react-router";
import { saveGame } from "../gameLogic/Controllers/requests";

export default function Risk() {
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [shouldDisplayChooseGameType, setShouldDisplayChooseGameType] = useState(true);
    const [shouldDisplayNumberOfPlayersSelector, setShouldDisplayNumberOfPlayersSelector] = useState(false);
    const [shouldDisplayGameSetup, setShouldDisplayGameSetup] = useState(true);
    const [gameType, setGameType] = useState<'online' | 'local'>('online');

    function onNumberSelect(number: number, b: any, a: { name: string }) {
        setNumberOfPlayers(number);
    }

    function onSubmitNumberOfPlayers() {
        setShouldDisplayGameSetup(false);
    }

    function onSubmitGameType(gameType: 'online' | 'local') {
        setGameType(gameType);
        setShouldDisplayChooseGameType(false);
        setShouldDisplayNumberOfPlayersSelector(true);
    }

    if (shouldDisplayGameSetup) {
        return (
            <GameSetup
                numberOfPlayers={numberOfPlayers}
                shouldDisplayChooseGameType={shouldDisplayChooseGameType}
                shouldDisplayNumberOfPlayersSelector={
                    shouldDisplayNumberOfPlayersSelector
                }
                onChangeNumberOfPlayers={onNumberSelect}
                onSubmitNumberOfPlayers={onSubmitNumberOfPlayers}
                onSubmitGameType={onSubmitGameType}
            />
        );
    }

    return <GameRedirect numberOfPlayers={numberOfPlayers} gameType={gameType}/>
}

function GameRedirect(props: { numberOfPlayers: number, gameType: 'online' | 'local' }) {
    const [gameID, setGameID] = useState('');

    const getData = async () => {
        try {
            const res = await saveGame(props.numberOfPlayers, props.gameType);
            if (!res) {
                throw new Error('Failed to create game');
            }

            const json = await res.json();
            const { uuid } = json;
            setGameID(uuid);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (!gameID) {
        return <h1>Loading...</h1>
    }

    return (
        <Redirect
            to={{
                pathname: gameID
            }}
        />
    );
}