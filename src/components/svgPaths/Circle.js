import React from "react";

function Circle(props) {
  return (
    <circle
      cx={props.coordinates.x}
      cy={props.coordinates.y}
      r="30"
      stroke="black"
      strokeWidth="3"
      fill={props.color}
    />
  );
}

export default Circle;