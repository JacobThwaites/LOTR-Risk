import React from "react";

type Props = {
    playerColour: string;
}

export default function PlayerDisconnectModal(props: Props): JSX.Element {
    return (
        <h1>{props.playerColour} Player Disconnected</h1>
    )
}