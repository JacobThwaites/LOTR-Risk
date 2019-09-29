import React from "react";
import "./middleEarth.css";
import MapAreas from "./MapAreas";
import Mountains from "./Mountains";
import Bridges from './Bridges';

const Map = () => {
  return (
    <svg
      width="1360"
      height="2e3"
      version="1.1"
      viewBox="0 0 1360 2000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="eriador-mountains-img"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/eriador_mountains.png")}
            alt="some mountains"
          />
        </pattern>
        <pattern
          className="mountains"
          id="eriador-mountains-2-img"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/eriador_mountains_2.png")}
            alt="some mountains"
          />
        </pattern>
        <pattern
          className="mountains"
          id="rhun-mountains"
          x="1024"
          y="576"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/rhun-mountains.png")}
            alt="some mountains"
          />
        </pattern>
        <pattern
          className="mountains"
          id="mountains"
          x="1024"
          y="576"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
          preserveAspectRatio="xMidYMid meet"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/mountains.png")}
            alt="some mountains"
          />
        </pattern>
        <pattern
          className="mountains"
          id="gondor-mountains"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 524 276"
          preserveAspectRatio="xMidYMid slice"
          preserveAspectRatio="xMidYMid meet"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/gondor-mountains.png")}
            alt="some mountains"
          />
        </pattern>
        <pattern
          id="diagonal-bridge"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/testbridge.png")}
            alt="a bridge"
          />
        </pattern>
        <pattern
          id="diagonal-bridge-2"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/diagonal-bridge-2.png")}
            alt="a bridge"
          />
        </pattern>
        <pattern
          id="horizontal-bridge"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/horizontal-bridge.png")}
            alt="a bridge"
          />
        </pattern>
        <pattern
          id="horizontal-bridge-2"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/horizontal-bridge-2.png")}
            alt="a bridge"
          />
        </pattern>
        <pattern
          id="vertical-bridge"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={require("./images/vertical-bridge.png")}
            alt="a bridge"
          />
        </pattern>
      </defs>
      <g stroke="#000" strokeWidth="1px">
        <MapAreas />
        <Mountains />
        <Bridges />
      </g>
    </svg>
  );
};

export default Map;
