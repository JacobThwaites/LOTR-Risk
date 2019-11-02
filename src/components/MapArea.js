import React from "react";
import "../sass/main.scss";

function MapArea(props) {
  return (
    <path
      className={'area ' + props.className}
      id={props.id}
      d={props.path}
      onClick={props.onClick}
      adjacentAreas={props.adjacentAreas}
      areaLogic={props.areaLogic}
    />
  );
};

export default MapArea;