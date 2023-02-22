import React from "react";

export default function WaitingForPlayers(props: {playersLeftToJoin: number}) {
    return (
        <>
        <h1>Waiting for {props.playersLeftToJoin} more players to join...</h1>
        </>
    )
}