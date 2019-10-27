import React from "react";
import Area from "./Area";
import areaPaths from './AreaPaths';

function MapAreas(props) {
  const areas = areaPaths.map(function(a) {
    return (
      <Area 
        className={a.region}
        id={a.areaName}
        path={a.path}
        onClick={props.onClick}
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
