import React, { useState} from "react";
import CustomButton from "./common/CustomButton";
import { saveGame } from "../gameLogic/Controllers/requests";
import { useNavigate } from "react-router-dom";

type GameType = 'online' | 'local';

export default function NewGame() {
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const [gameType, setGameType] = useState<GameType>('online');

    const navigate = useNavigate();

    const gameTypeOptions = ['online', 'local'];
    const numberOfPlayerOptions = [2,3,4];

    function generateClassName(value: any, state: any): string {
        let className = "new-game--option";

        if (value === state) {
            className += " selected";
        }

        return className;
    }

    async function createGame() {
        try {
            const res = await saveGame(numberOfPlayers, gameType);
            if (!res) {
                throw new Error('Failed to create game');
            }

            const json = await res.json();
            const { uuid } = json;

            navigate(`/${uuid}`);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='new-game'>
            <h1 className="new-game--header">Create New Game</h1>

            <div className="new-game--form">
                <div className="new-game--selector">
                    <label className="new-game--label">Game Type: </label>
                    {gameTypeOptions.map(o => {
                        return <div key={o} className={generateClassName(o, gameType)} onClick={() => setGameType(o as GameType)}>{o}</div>
                    })}
                </div>
                <div className="new-game--selector">
                    <label className="new-game--label">Number of Players: </label>
                    <div className="new-game--selector_options">
                        {numberOfPlayerOptions.map(n => {
                            return <div key={n} className={generateClassName(n, numberOfPlayers)} onClick={() => setNumberOfPlayers(n)}>{n}</div>
                        })}
                    </div>
                </div>

                <CustomButton 
                    id='new-game--submit-button'
                    label='Create'
                    onClick={() => createGame()}
                />
            </div>
        </div>
    )
}