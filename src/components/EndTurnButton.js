import React from "react";

function EndTurnButton(props) {
  return (
    <button class="endTurnButton" onClick={props.onEndTurnClick}>
      End Turn
    </button>
  );
}

export default EndTurnButton;
