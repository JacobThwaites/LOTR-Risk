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
  addCircleToMap(elementId: string, area: AreaType) {
    const svgElement = document.getElementById(elementId)! as unknown as SVGGraphicsElement;
    const domElement = svgElement.getBBox();
    const coordinates = this.calculateCentre(domElement);
    const circle = this.drawCircle(coordinates, area);
    return circle;
  }

  calculateCentre(element: Element) {
    const centreX = element.x + element.width / 2;
    const centreY = element.y + element.height / 2;
    const centreCoordinates = { x: centreX, y: centreY };
    return centreCoordinates;
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