import React from 'react';

function CurrentPlayer(props) {
    return (
    <h1 className='current-player'>{props.playerName}'s turn</h1>
    )
}

export default CurrentPlayer;