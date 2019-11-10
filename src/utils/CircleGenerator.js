import React, { Component } from "react";
import { AreaName } from "../logic/Enums/AreaNames";

class CircleGenerator extends Component {
  generateCircles() {
    const areaIds = this.getAreaIds();
    const circles = [];

    for (let i = 0; i < areaIds.length; i++) {
      const circle = this.addCircleToMap(areaIds[i]);
      circles.push(circle);
    }

    return circles;
  }

  getAreaIds() {
      const ids = [];
      for (const key in AreaName) {
  
        if (AreaName.hasOwnProperty(key)) {
          const element = AreaName[key];
          ids.push(element);
        }
      }
      return ids;
  }

  addCircleToMap(elementId) {
    const domElement = document.getElementById(elementId).getBBox();
    const coordinates = this.calculateCentre(domElement);
    const circle = this.drawCircle(coordinates);
    return circle;
  }

  calculateCentre(element) {
    const centreX = element.x + element.width / 2;
    const centreY = element.y + element.height / 2;
    const centreCoordinates = { x: centreX, y: centreY };
    return centreCoordinates;
  }

  drawCircle(coordinates) {
    return (
      <circle
        cx={coordinates.x}
        cy={coordinates.y}
        r="30"
        stroke="black"
        strokeWidth="3"
        fill="red"
      />
    );
  }
}

export default CircleGenerator;
