import React from 'react';

type Props = {
    turns: number
}

export default function TurnsRemaining(props: Props) {
    return (
        <h1 id='turns-remaining'>Turns Remaining: {props.turns}</h1>
    )
}