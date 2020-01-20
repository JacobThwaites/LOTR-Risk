import React from "react";

function EndTurnButton(props) {
  return (
    <button className="endTurnButton" onClick={props.onEndTurnClick}>
      End Turn
    </button>
  );
}

export default EndTurnButton;
