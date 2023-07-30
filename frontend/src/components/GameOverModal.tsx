import { Dialog } from '@mui/material';
import React from 'react';
import { LeaderboardEntry } from '../gameLogic/Controllers/Leaderboard/LeaderboardCalculator';
import Leaderboard from './Leaderboard';

export default function GameOverModal(props: { leaderboardData: LeaderboardEntry[] }) {
    const winner = props.leaderboardData[0];
    return (
        <Dialog open={true} fullWidth maxWidth='sm' className='game-over'>
            <h1 className='game-over--title'>GAME OVER!!</h1>
            <h3 className='game-over--winner'>{winner.colour} Player wins!</h3>
            <div className='game-over--leaderboard'>
                <Leaderboard leaderboardData={props.leaderboardData}/>
            </div>
            {/* TODO: return home onclick */}
            <button className='game-over--button' onClick={() => console.log('return home')}>Home</button>
        </Dialog>

    )
}