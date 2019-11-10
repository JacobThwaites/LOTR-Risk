import React from "react";

function MountainImages() {
  return (
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
          href={require("../images/eriador_mountains.png")}
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
          href={require("../images/eriador_mountains_2.png")}
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
          href={require("../images/rhun-mountains.png")}
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
      >
        <image
          width="1024"
          height="576"
          href={require("../images/mountains.png")}
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
      >
        <image
          width="1024"
          height="576"
          href={require("../images/gondor-mountains.png")}
          alt="some mountains"
        />
      </pattern>
    </defs>
  );
}

export default MountainImages;
