import React from "react";
import MapArea from "./MapArea";
import areaDetails from './svgPaths/AreaDetails';

function MapAreas(props) {
  const areas = areaDetails.map(function(a) {
    return (
      <MapArea 
        className={a === props.attackingArea ? 'attacker' : a === props.defendingArea ? 'defender' : a.region}
        id={a.area.getName()}
        path={a.path}
        onClick={() => props.onClick(a)}
        clickable={props.clickableAreas.includes(a.area.getName()) || props.clickableAreas.length === 0}
        areaLogic={a.area}
        isRendered={props.isRendered}
      />
    )
  });
  
  return areas;
};

export default MapAreas;