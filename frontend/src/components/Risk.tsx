import React, { useEffect, useState } from "react";
import GameSetup from "./GameSetup";
import { Redirect } from "react-router";
import { createGame } from "../logic/Controllers/URLGenerator";

export default function Risk() {
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [shouldDisplayChooseGameType, setShouldDisplayChooseGameType] = useState(true);
    const [shouldDisplayNumberOfPlayersSelector, setShouldDisplayNumberOfPlayersSelector] = useState(false);
    const [shouldDisplayNameSelector, setShouldDisplayNameSelector] = useState(false);
    const [shouldDisplayGameSetup, setShouldDisplayGameSetup] = useState(true);
    const [playerName, setPlayerName] = useState('');
    const [gameType, setGameType] = useState('online');

    function onNumberSelect(number: number, b: any, a: { name: string }) {
        setNumberOfPlayers(number);
    }

    function onChangeName(event: any) {
        const playerName = event.target.value;
        setPlayerName(playerName);
    }

    function onSubmitNumberOfPlayers() {
        setShouldDisplayNumberOfPlayersSelector(false);
        setShouldDisplayNameSelector(true);
    }

    async function onSubmitName() {
        setShouldDisplayGameSetup(false);
    }

    function onSubmitGameType(gameType: string) {
        setGameType(gameType);
        setShouldDisplayChooseGameType(false);
        setShouldDisplayNumberOfPlayersSelector(true);
    }

    if (shouldDisplayGameSetup) {
        return (
            <GameSetup
                numberOfPlayers={numberOfPlayers}
                playerName={playerName}
                shouldDisplayChooseGameType={shouldDisplayChooseGameType}
                shouldDisplayNumberOfPlayersSelector={
                    shouldDisplayNumberOfPlayersSelector
                }
                onChangeNumberOfPlayers={onNumberSelect}
                onSubmitNumberOfPlayers={onSubmitNumberOfPlayers}
                onChangeName={onChangeName}
                onSubmitPlayerName={onSubmitName}
                onSubmitGameType={onSubmitGameType}
            />
        );
    }

    return <GameRedirect numberOfPlayers={numberOfPlayers} playerName={playerName} />
}

function GameRedirect(props: { numberOfPlayers: number, playerName: string }) {
    const [uuid, setUuid] = useState('');

    const getData = async () => {
        try {
            const game = await createGame(props.numberOfPlayers);
            const json = await game!.json()
            const { uuid } = json.data;
            setUuid(uuid);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (!uuid) {
        return <h1>Loading...</h1>
    }

    return (
        <Redirect
            to={{
                pathname: uuid,
                state: { numberOfPlayers: props.numberOfPlayers, playerName: props.playerName },
            }}
        />
    );
}