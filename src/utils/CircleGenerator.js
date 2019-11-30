import React, { Component } from "react";
import Circle from '../components/svgPaths/Circle';

class CircleGenerator extends Component {
  addCircleToMap(elementId) {
    const domElement = document.getElementById(elementId).getBBox();
    const coordinates = this.calculateCentre(domElement);
    const circle = this.drawCircle(coordinates, 'yellow');
    return circle;
  }

  calculateCentre(element) {
    const centreX = element.x + element.width / 2;
    const centreY = element.y + element.height / 2;
    const centreCoordinates = { x: centreX, y: centreY };
    return centreCoordinates;
  }

  drawCircle(coordinates, color) {
    return (
      <Circle 
        coordinates={coordinates}
        color={color}
      />
    );
  }
}

export default CircleGenerator;