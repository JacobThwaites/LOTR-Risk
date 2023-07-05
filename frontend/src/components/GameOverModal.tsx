import { Dialog } from '@mui/material';
import React from 'react';
import LeaderboardCalculator from '../gameLogic/Controllers/Leaderboard/LeaderboardCalculator';
import { Game } from '../gameLogic/Models/Game';
import Leaderboard from './Leaderboard';

export default function GameOverModal(props: { game: Game }) {
    const leaderboardInfo = LeaderboardCalculator.getLeaderboard(props.game);
    const winner = leaderboardInfo[0];
    return (
        <Dialog open={true} fullWidth maxWidth='sm' className='game-over'>
            <h1 className='game-over--title'>GAME OVER!!</h1>
            <h3 className='game-over--winner'>{winner.colour} Player wins!</h3>
            <div className='game-over--leaderboard'>
                <Leaderboard game={props.game}/>
            </div>
            {/* TODO: return home onclick */}
            <button className='game-over--button' onClick={() => console.log('return home')}>Home</button>
        </Dialog>

    )
}