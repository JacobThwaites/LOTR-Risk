import React from "react";
import MapArea from "./MapArea";
import areaPaths from './svgPaths/AreaPaths';

function MapAreas(props) {
  const areas = areaPaths.map(function(a) {
    console.log(a);
    return (
      <MapArea 
        className={a.areaName === props.attackingArea ? 'attacker' : a.areaName === props.defendingArea ? 'defender' : a.region}
        id={a.areaName}
        path={a.path}
        onClick={() => props.onClick(a.areaName)}
      />
    )
  });
  return (
    <>
      {areas}
    </>
  )
};

export default MapAreas;
