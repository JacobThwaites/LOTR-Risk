import React, { Component } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";
import Islands from "./svgPaths/Islands";
import Strongholds from "./svgPaths/Strongholds";

class Map extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      isRendered: false,
    };
    this.isAreaClickable = this.isAreaClickable.bind(this);
  }

  componentDidMount() {
    this.setState({ isRendered: true });
  }


  isAreaClickable(area) {
    if (this.props.attackingArea === null) {
      return this.isAttackingAreaClickable(area);
    } else {
      return this.isDefendingAreaClickable(area);
    }
  }
  
  isAttackingAreaClickable(area) {
    const { isRendered } = this.state;
    const { currentPlayer } = this.props;

    if (!isRendered) {
      return false;
    }

    return area.belongsToPlayer(currentPlayer);
  }

  isDefendingAreaClickable(area) {
    const { isRendered } = this.state;
    const { currentPlayer, attackingArea } = this.props;
    
    if (!isRendered) {
      return false;
    }

    const defendingPlayer = area.player;
    return currentPlayer !== defendingPlayer || attackingArea.area === area;
  }

  render() {
    return (
      <>
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
              onClick={this.props.onAreaSelect}
              attackingArea={this.props.attackingArea}
              defendingArea={this.props.defendingArea}
              isRendered={this.state.isRendered}
              isAreaClickable={this.isAreaClickable}
            />
            <Islands />
            <Strongholds />
            <Bridges />
          </g>
        </svg>
      </>
    );
  }
}

export default Map;