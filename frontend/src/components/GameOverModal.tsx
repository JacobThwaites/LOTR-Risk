import React from 'react';
import { useHistory } from "react-router-dom";
import { Dialog } from '@mui/material';
import { LeaderboardEntry } from '../gameLogic/Controllers/Leaderboard/LeaderboardCalculator';
import Leaderboard from './Leaderboard';

export default function GameOverModal(props: { leaderboardData: LeaderboardEntry[] }) {
    const history = useHistory();
  
    const redirectToHome = () =>{ 
        let path = `/`; 
        history.push(path);
    }

    const winner = props.leaderboardData[0];
    return (
        <Dialog open={true} fullWidth maxWidth='sm' className='game-over'>
            <h1 className='game-over--title'>GAME OVER!!</h1>
            <h3 className='game-over--winner'>{winner.colour} Player wins!</h3>
            <div className='game-over--leaderboard'>
                <Leaderboard leaderboardData={props.leaderboardData}/>
            </div>
            <button className='game-over--button' onClick={redirectToHome}>Home</button>
        </Dialog>

    )
}