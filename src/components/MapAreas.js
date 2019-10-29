import React from "react";
import Area from "./Area";
import areaPaths from './svgPaths/AreaPaths';

function MapAreas(props) {
  const areas = areaPaths.map(function(a) {
    return (
      <Area 
        className={a.areaName === props.attackingArea ? 'attacker' : a.region}
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
