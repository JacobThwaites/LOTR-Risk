import React, { Component } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";

class Map extends Component {
  constructor({props}) {
    super(props);
    this.state = {
      areaSelected: null,
    }
    this.onAreaSelect = this.onAreaSelect.bind(this);
  }

  onAreaSelect() {
    console.log('area clicked');
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
          />
          <Mountains />
          <Bridges />
        </g>
      </svg>
    );
  }
};

export default Map;
