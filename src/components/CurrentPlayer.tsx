import React from 'react';

type Props = {
    playerName: string
}

export default function CurrentPlayer(props: Props) {
    return (
    <h1 className='current-player'>{props.playerName}'s turn</h1>
    )
}