import React from "react";
import { LeaderboardEntry, LeaderboardEntry as LeaderboardEntryData } from "../gameLogic/Controllers/Leaderboard/LeaderboardCalculator";

type Props = {
    leaderboardData: LeaderboardEntry[]
}

export default function Leaderboard(props: Props): JSX.Element {
    const entries = props.leaderboardData.map((entry: LeaderboardEntryData, i: number) => {
        return <LeaderboardRows entry={entry} key={i}/>
    })

    return (
        <div className='leaderboard'>
            <h1 className='leaderboard--title'>Leaderboard</h1>
            <div className='leaderboard--table'>
                <LeaderboardHeaders />
                {entries}
            </div>
        </div>
    )
}

function LeaderboardHeaders(): JSX.Element {
    return (
        <div className='leaderboard--headers' >
            <p>Player</p>
            <p>Areas</p>
            <p>Units</p>
        </div>
    )
}


function LeaderboardRows(props: { entry: LeaderboardEntryData }): JSX.Element {
    return (
        <div className="leaderboard--row">
            <p>{props.entry.colour} Player</p>
            <p>{props.entry.areasControlled}</p>
            <p>{props.entry.totalUnits}</p>
        </div>
    )
}