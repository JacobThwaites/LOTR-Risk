import React, { Component } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";

class Map extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      attackingArea: null,
      defendingArea: null,
      clickableAreas: [],
      circle: '',
    };
    this.onAreaSelect = this.onAreaSelect.bind(this);
  }

  componentDidMount() {
    this.getAreaCentre();
    // this.drawCircle();
  }

  onAreaSelect(area) {
    if (this.state.attackingArea === area) {
      this.setState({
        attackingArea: null,
        defendingArea: null,
        clickableAreas: []
      });
    } else if (this.state.defendingArea === area) {
      this.setState({ defendingArea: null });
    } else if (this.state.attackingArea !== null) {
      this.setState({ defendingArea: area });
    } else {
      this.setState({ attackingArea: area });
      this.getClickableAreas(area);
    }
  }

  getClickableAreas(area) {
    const clickableAreas = [...area.area.adjacentAreas];
    clickableAreas.push(area.areaName);

    this.setState({ clickableAreas });
  }

  getAreaCentre() {
    const fangorn = document.getElementById("Fangorn").getBBox();
    const centre = this.calculateCentre(fangorn);
    const circle = this.drawCircle(centre);
    this.setState({ circle });
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
        r="40"
        stroke="black"
        stroke-width="3"
        fill="red"
      />
    );
  }

  render() {
    return (
      <svg
        id="map"
        width="1360"
        height="2e3"
        version="1.1"
        viewBox="0 0 1360 2000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#000" strokeWidth="1px">
          <MapAreas
            onAreaSelect={this.onAreaSelect}
            onClick={this.onAreaSelect}
            attackingArea={this.state.attackingArea}
            defendingArea={this.state.defendingArea}
            clickableAreas={this.state.clickableAreas}
            circles={this.state.circle}
          />
          <Mountains />
          <Bridges />
        </g>
      </svg>
    );
  }
}

export default Map;
