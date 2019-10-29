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
    }
    this.onAreaSelect = this.onAreaSelect.bind(this);
  }

  onAreaSelect(area) {
    if (this.state.attackingArea === area) {
      this.setState({ attackingArea: null, defendingArea: null });
    } else if (this.state.attackingArea !== null) {
      this.setState({ defendingArea: area });
    } else {
      this.setState({ attackingArea: area });
    }
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
          />
          <Mountains />
          <Bridges />
        </g>
      </svg>
    );
  }
};

export default Map;
