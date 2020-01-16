import React from "react";

function Circle(props) {
  return (
    <>
      <circle
        cx={props.coordinates.x}
        cy={props.coordinates.y}
        r="30"
        stroke="black"
        strokeWidth="3"
        fill={props.color}
      />
      <text
        className="areaUnits"
        x={props.coordinates.x}
        y={props.coordinates.y}
        textAnchor="middle"
        stroke="#eee"
        strokeWidth="2px"
        dy=".3em"
      >
        {props.areaUnits}
      </text>
    </>
  );
}

export default Circle;
