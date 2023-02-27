import React from "react";
import { ReactComponent as RingSVG } from '../assets/ring-loading.svg';

export default function WaitingForPlayers(props: { playersLeftToJoin: number }) {
    return (
        <div id='waiting'>
            <RingSVG id='waiting-image'/>
            <h1>Waiting for {props.playersLeftToJoin} more players to join...</h1>
            <h1>Share this url to allow others to join: {window.location.href}</h1>
        </div>
    )
}