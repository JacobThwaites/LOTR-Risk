import React from "react";
import MapArea from "./MapArea";
import areaDetails from './svgPaths/AreaDetails';

function MapAreas(props) {
  const areas = areaDetails.map(function(a) {
    return (
      <MapArea 
        className={a.area === props.attackingArea ? 'attacker' : a.area === props.defendingArea ? 'defender' : a.region}
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