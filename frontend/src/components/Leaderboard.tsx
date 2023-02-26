import React from "react";
import LeaderboardCalculator, { LeaderboardEntry as LeaderboardEntryData } from "../gameLogic/Controllers/Leaderboard/LeaderboardCalculator";
import { Game } from "../gameLogic/Models/Game";

type Props = {
    game: Game
}

export default function Leaderboard(props: Props): JSX.Element {
    const leaderboardInfo = LeaderboardCalculator.getLeaderboard(props.game);
    const entries = leaderboardInfo.map((entry: LeaderboardEntryData) => {
        return <LeaderboardRows entry={entry} />
    })
// TODO: change from table to regular div for styling purposes
    return (
        <div className='leaderboard'>
            <h3 className='leaderboard--header'>Leaderboard</h3>
            <table className='leaderboard--table'>
                <LeaderboardHeaders />
                {entries}
            </table>
        </div>
    )
}

function LeaderboardHeaders(): JSX.Element {
    return (
        <>
            <th>Player</th>
            <th>Areas</th>
            <th>Units</th>
        </>
    )
}


function LeaderboardRows(props: { entry: LeaderboardEntryData }): JSX.Element {
    return (
        <tr className="leaderboard--row">
            <td>{props.entry.playerName} Player</td>
            <td>{props.entry.areasControlled}</td>
            <td>{props.entry.totalUnits}</td>
        </tr>
    )
}