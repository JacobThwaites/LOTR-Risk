import React from "react";
import "./middleEarth.css";
import MapAreas from "./MapAreas";
import Mountains from "./Mountains";
import Bridges from "./Bridges";

const Map = () => {
  return (
    <svg
      id='map'
      width="1360"
      height="2e3"
      version="1.1"
      viewBox="0 0 1360 2000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#000" strokeWidth="1px">
        <MapAreas />
        <Mountains />
        <Bridges />
      </g>
    </svg>
  );
};

export default Map;
