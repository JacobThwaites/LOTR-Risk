import React, { Component } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";
import { Player } from "../logic/Models/Player";
import { Colour } from "../logic/Enums/Colours";
import { AreaAssigner } from "../logic/Controllers/AreaAssigner";
import { GameController } from "../logic/Controllers/GameController";
import { CombatController } from "../logic/Controllers/CombatController";
import CombatHandler from "./CombatHandler";

class Map extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      attackingArea: null,
      defendingArea: null,
      attackingDice: 0,
      defendingDice: 0,
      clickableAreas: [],
      isRendered: false,
      game: null
    };
    this.onAreaSelect = this.onAreaSelect.bind(this);
    this.onCombatButtonClick = this.onCombatButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isRendered: true });
    this.setupGame();
  }

  setupGame() {
    const areaAssigner = this.setupAreaAssigner();
    const controller = new GameController(areaAssigner.getPlayers(), 30);

    controller.generateGame();
  }

  setupAreaAssigner() {
    const player1 = new Player("player 1", Colour.Green, true, 30);
    const player2 = new Player("player 2", Colour.Yellow, false, 30);
    const players = [player1, player2];
    const areaAssigner = new AreaAssigner(players);

    return areaAssigner;
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
      if (!this.defendingAreaIsClickable(area)) {
        this.setState({ defendingArea: area });
      }
    } else {
      this.setState({ attackingArea: area });
      this.getClickableAreas(area);
    }
  }

  defendingAreaIsClickable(defendingArea) {
    const { attackingArea } = this.state;
    const attackingPlayer = attackingArea.area.player;
    const defendingPlayer = defendingArea.area.player;

    return attackingPlayer === defendingPlayer;
  }

  getClickableAreas(area) {
    const clickableAreas = area.area.getAdjacentAreas();
    clickableAreas.push(area.area.getName());

    this.setState({ clickableAreas });
  }

  onInputFieldChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  onCombatButtonClick() {
    const { attackingArea, defendingArea } = this.state;

    const combatController = new CombatController(
      attackingArea.area,
      defendingArea.area
    );
    combatController.handleCombat(1, 1);

    this.setState({ attackingArea: null, defendingArea: null });
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
              onClick={this.onAreaSelect}
              attackingArea={this.state.attackingArea}
              defendingArea={this.state.defendingArea}
              clickableAreas={this.state.clickableAreas}
              isRendered={this.state.isRendered}
            />
            <Bridges />
          </g>
        </svg>
        {this.state.attackingArea && this.state.defendingArea && (
          <CombatHandler 
            attackingDice={this.state.attackingDice}
            defendingDice={this.state.defendingDice}
            onCombatButtonClick={this.onCombatButtonClick}
            onInputFieldChange={this.onInputFieldChange}
          />
        )}
      </>
    );
  }
}

export default Map;
