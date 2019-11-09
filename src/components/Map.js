import React, { Component } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";

class Map extends Component {
  constructor({props}) {
    super(props);
    this.state = {
      attackingArea: null,
      defendingArea: null,
      clickableAreas: [],
    }
    this.onAreaSelect = this.onAreaSelect.bind(this);
  }

  componentDidMount() {
    this.getAreaCentre();
  }

  onAreaSelect(area) {
    if (this.state.attackingArea === area) {
      this.setState({ attackingArea: null, defendingArea: null, clickableAreas: [] });
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
    clickableAreas.push(area.areaName)

    this.setState({ clickableAreas });
  }

  getAreaCentre() {
    const test = document.getElementById('Forlindon').getBBox();
    console.log(test);
    const centre = this.calculateCentre(test);
    console.log(centre);
  }

  calculateCentre(element) {
    const centreX = element.x + element.width / 2;
    const centreY = element.y + element.height / 2;
    const centreCoordinates = `${centreX}, ${centreY}`;
    return centreCoordinates;
  }

  render() {
    return (
      <svg
        id='map'
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
          />
          <Mountains />
          <Bridges />
        </g>
      </svg>
    );
  }
};

export default Map;
