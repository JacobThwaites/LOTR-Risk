import React, { useState } from "react";

type Props = {
    playerColour: string;
}

// TODO: 
// decide where to put the modal
// add styling


export default function PlayerDisconnectModal(props: Props): JSX.Element {
    const SIXTY_SECONDS_IN_MILLISECONDS = 60000;
    const [timeRemaining, setTimeRemaining] = useState(SIXTY_SECONDS_IN_MILLISECONDS);
    const countdownInterval = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
    }, 1000)

    if (!timeRemaining) {
        clearInterval(countdownInterval);
    }

    const timeRemainingText = timeRemaining ? `Time Remaining: ${timeRemaining}` : 'Waiting for server...';

    return (
        <div>
            <h1>{props.playerColour} Player Disconnected</h1>
            <p>{timeRemainingText}</p>
        </div>
        
    )
}