import React from "react";
import CircleGenerator from '../utils/CircleGenerator';
import "../sass/main.scss";

function MapArea(props) {
  const circleGenerator = new CircleGenerator();  
  return (
    <>
      <path
        className={"area " + props.className}
        id={props.id}
        d={props.path}
        onClick={props.onClick}
        adjacentAreas={props.adjacentAreas}
        areaLogic={props.areaLogic}
        />
      {props.isRendered &&
        circleGenerator.addCircleToMap(props.id, props.areaLogic)
      }
    </>
  );
}

export default MapArea;