import React, { Component } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";
import { Player } from "../logic/Models/Player";
import { Colour } from "../logic/Enums/Colours";
import { AreaAssigner } from "../logic/Controllers/AreaAssigner";

class Map extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      attackingArea: null,
      defendingArea: null,
      clickableAreas: [],
      isRendered: false,
    };
    this.onAreaSelect = this.onAreaSelect.bind(this);
  }

  componentDidMount() {
    this.setState({ isRendered: true });
    this.testAreaAssigner();
  }

  testAreaAssigner() {
    const player1 = new Player('player 1', Colour.Green, true, 30);
    const player2 = new Player('player 2', Colour.Green, true, 30);

    const players = [player1, player2];

    const areaAssigner = new AreaAssigner(players);
    areaAssigner.assignAreas();

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
    const clickableAreas =  area.area.getAdjacentAreas();
    clickableAreas.push(area.area.getName());

    this.setState({ clickableAreas });
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
          <Mountains />
          <MapAreas
            onClick={this.onAreaSelect}
            attackingArea={this.state.attackingArea}
            defendingArea={this.state.defendingArea}
            clickableAreas={this.state.clickableAreas}
            isRendered={this.state.isRendered}
          />
          <Bridges />
        </g>
      </svg>
    );
  }
}

export default Map;