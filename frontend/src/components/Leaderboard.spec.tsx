import '@testing-library/jest-dom'
import React from 'react';
import { render } from '@testing-library/react'
import Leaderboard from './Leaderboard';
import { LeaderboardEntry } from '../gameLogic/Enums/LeaderboardEntry';

it('renders Leaderboard correctly', async () => {
    const leaderboardData: LeaderboardEntry[] = [
        {
            colour: 'green',
            areasControlled: 1,
            totalUnits: 2,
        },
        {
            colour: 'black',
            areasControlled: 2,
            totalUnits: 2,
        }
    ];

    const { container } = render(
        <Leaderboard leaderboardData={leaderboardData}/>
    );
    expect(container).toMatchSnapshot();
});

it('displays leaderboard data', async () => {
    const leaderboardData: LeaderboardEntry[] = [
        {
            colour: 'Green',
            areasControlled: 1,
            totalUnits: 2,
        },
        {
            colour: 'Black',
            areasControlled: 2,
            totalUnits: 2,
        },
        {
            colour: 'Red',
            areasControlled: 2,
            totalUnits: 3,
        }
    ];

    const { container } = render(
        <Leaderboard leaderboardData={leaderboardData}/>
    );

    const leaderboardEntries = container.getElementsByClassName('leaderboard--row');
    expect(leaderboardEntries).toHaveLength(3);
});
