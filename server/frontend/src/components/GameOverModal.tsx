import React from 'react';
import { useNavigate } from "react-router-dom";
import { Dialog } from '@mui/material';
import { LeaderboardEntry } from '../gameLogic/Enums/LeaderboardEntry';
import Leaderboard from './Leaderboard';

export default function GameOverModal(props: { leaderboardData: LeaderboardEntry[] }) {
    const navigate = useNavigate();
    const winner = props.leaderboardData[0];
    
    return (
        <Dialog open={true} fullWidth maxWidth='sm' className='game-over'>
            <h1 className='game-over--title'>GAME OVER!!</h1>
            <h3 className='game-over--winner'>{winner.colour} Player wins!</h3>
            <div className='game-over--leaderboard'>
                <Leaderboard leaderboardData={props.leaderboardData}/>
            </div>
            <button className='game-over--button' onClick={() => navigate('/')}>Home</button>
        </Dialog>

    )
}