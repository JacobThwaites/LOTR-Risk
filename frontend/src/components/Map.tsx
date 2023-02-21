import React, { Component } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";
import Islands from "./svgPaths/Islands";
import Strongholds from "./svgPaths/Strongholds";
import { AreaType } from "../gameLogic/Models/AreaType"; 
import { Player } from "../gameLogic/Models/Player";
import { areAreasConnected } from "../utils/areAreasConnected";

type Props = {
  attackingArea: any,
  defendingArea: any,
  attackingDice: number,
  currentPlayer: Player,
  onAreaSelect: any
}

type State = {
  isRendered: boolean
}

export default class Map extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isRendered: false,
    };
    this.isAreaClickable = this.isAreaClickable.bind(this);
    this.onAreaSelect = this.onAreaSelect.bind(this);
    this.generateAreaClassName = this.generateAreaClassName.bind(this);
  }

  componentDidMount() {
    this.setState({ isRendered: true });
  }

  onAreaSelect(area: AreaType) {
    if (this.isAreaClickable(area)) {
      this.props.onAreaSelect(area);
    }
  }

  generateAreaClassName(a: any) {
    const { attackingArea, defendingArea } = this.props;
    let className;
    if (a.area === attackingArea) {
      className = "attacker";
    } else if (a.area === defendingArea) {
      className = "defender";
    } else {
      className = a.region;
    }

    if (this.isAreaClickable(a.area)) {
      className = `${className} clickable`;
    }

    return className;
  }

  isAreaClickable(area: any) {
    if (this.isAttackingAreaSelected(area)) {
      return this.isAttackingAreaClickable(area);
    } else {
      return this.isDefendingAreaClickable(area);
    }
  }

  isAttackingAreaSelected(area: any) {
    return (
      this.props.attackingArea === null || this.props.attackingArea === area
    );
  }

  isAttackingAreaClickable(area: AreaType) {
    const { isRendered } = this.state;
    const { currentPlayer } = this.props;

    if (!isRendered) {
      return false;
    }

    return currentPlayer.ownsArea(area);
  }

  isDefendingAreaClickable(area: AreaType) {
    const { isRendered } = this.state;
    const { currentPlayer, attackingArea } = this.props;

    if (!isRendered || !attackingArea) {
      return false;
    }

    const defendingPlayer = area.getPlayer();
    return (
      (areAreasConnected(attackingArea, area) && currentPlayer !== defendingPlayer) ||
      attackingArea.area === area
    );
  }

  render() {
    return (
      <svg
        id="map"
        version="1.1"
        viewBox="0 0 1360 2000"
        xmlns="http://www.w3.org/2000/svg"
        fill="blue"
      >
        <g stroke="#000" strokeWidth="1px">
          <Mountains />
          <MapAreas
            onClick={this.onAreaSelect}
            isRendered={this.state.isRendered}
            isAreaClickable={this.isAreaClickable}
            generateAreaClassName={this.generateAreaClassName}
          />
          <Islands />
          <Strongholds />
          <Bridges />
        </g>
      </svg>
    );
  }
}