import React from "react";
import mountains from "../assets/mountains.png";
import mountains2 from "../assets/mountains2.png";

function MountainImages() {
  return (
    <defs>
      <pattern
        className="mountains"
        id="rhun-mountains"
        x="1024"
        y="576"
        width="6"
        height="6"
        viewBox="0 0 1024 576"
      >
        <image
          width="1024"
          height="576"
          href={mountains2}
          alt="some mountains"
        />
      </pattern>
      <pattern
        className="mountains"
        id="mountains"
        x="1024"
        y="576"
        width="3"
        height="3"
        viewBox="0 0 1024 576"
        preserveAspectRatio="xMidYMid slice"
      >
        <image
          width="1024"
          height="576"
          href={mountains}
          alt="some mountains"
        />
      </pattern>
      <pattern
        className="mountains"
        id="mordor-mountains"
        x="1024"
        y="576"
        width="5"
        height="5"
        viewBox="0 0 1024 576"
        preserveAspectRatio="xMidYMid slice"
      >
        <image
          width="1024"
          height="576"
          href={mountains2}
          alt="some mountains"
        />
      </pattern>
    </defs>
  );
}

export default MountainImages;
