import React from "react";
import MapArea from "./MapArea";
import areaDetails from './svgPaths/AreaDetails';

function MapAreas(props) {
  const areas = areaDetails.map(function(a) {
    return (
      <MapArea 
        className={props.generateAreaClassName(a)}
        id={a.area.getName()}
        key={a.area.getName()}
        path={a.path}
        onClick={() => props.onClick(a.area)}
        clickable={props.isAreaClickable(a.area)}
        areaLogic={a.area}
        isRendered={props.isRendered}
      />
    )
  });
  
  return areas;
};

export default MapAreas;