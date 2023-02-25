import React, { Component } from "react";
import Circle from '../components/svgPaths/Circle';
import { AreaType } from "../gameLogic/Models/AreaType";

type Element = {
  x: number,
  y: number,
  width: number,
  height: number
}

type Coordinates = {
  x: number, 
  y: number
}

export default class CircleGenerator extends Component {
  addCircleToMap(centroid: {x: number, y: number}, area: AreaType) {
    const circle = this.drawCircle(centroid, area);
    return circle;
  }

  drawCircle(coordinates: Coordinates, area: AreaType) {
    return (
      <Circle 
        coordinates={coordinates}
        color={area.getPlayer()!.getColour()}
        areaUnits={area.getUnits()}
      />
    );
  }
}