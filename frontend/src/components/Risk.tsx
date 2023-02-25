import React, { useEffect, useState } from "react";
import GameSetup from "./GameSetup";
import { Redirect } from "react-router";
import { saveGame } from "../gameLogic/Controllers/requests";
import { convertPlayerAreasToString } from "../utils/playerAreaParser";
import { setupAreaAssignments } from "../gameLogic/Controllers/AreaAssigner";

export default function Risk() {
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [shouldDisplayChooseGameType, setShouldDisplayChooseGameType] = useState(true);
    const [shouldDisplayNumberOfPlayersSelector, setShouldDisplayNumberOfPlayersSelector] = useState(false);
    const [shouldDisplayGameSetup, setShouldDisplayGameSetup] = useState(true);
    const [gameType, setGameType] = useState('online');

    function onNumberSelect(number: number, b: any, a: { name: string }) {
        setNumberOfPlayers(number);
    }

    function onSubmitNumberOfPlayers() {
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

function GameRedirect(props: { numberOfPlayers: number, gameType: string }) {
    const [gameID, setGameID] = useState('');

    const getData = async () => {
        try {
            const areas = setupAreaAssignments(props.numberOfPlayers);
            const areaStrings = convertPlayerAreasToString(areas);
            const res = await saveGame(props.numberOfPlayers, areaStrings);
            const json = await res!.json()
            const { id } = json.data;
            setGameID(id);
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
                pathname: gameID,
                state: { numberOfPlayers: props.numberOfPlayers, gameID: gameID, gameType: props.gameType },
            }}
        />
    );
}