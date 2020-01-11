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
      isRendered: false,
      game: null,
      currentPlayer: null,
    };
    this.onAreaSelect = this.onAreaSelect.bind(this);
    this.isAreaClickable = this.isAreaClickable.bind(this);
    this.onCombatButtonClick = this.onCombatButtonClick.bind(this);
    this.onEndTurnClick = this.onEndTurnClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isRendered: true });
    this.setupGame();
  }

  setupGame() {
    const areaAssigner = this.setupAreaAssigner();
    const controller = new GameController(areaAssigner.getPlayers(), 30);

    const game = controller.generateGame();
    const currentPlayer = game.getCurrentPlayer();
    this.setState({ game, currentPlayer });
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
        defendingArea: null
      });
    } else if (this.state.defendingArea === area) {
      this.setState({ defendingArea: null });
    } else if (this.state.attackingArea !== null) {
      this.setState({ defendingArea: area });
    } else {
      this.setState({ attackingArea: area });
    }
  }

  isAreaClickable(area) {
    if (this.state.attackingArea === null) {
      return this.isAttackingAreaClickable(area);
    } else {
      return this.isDefendingAreaClickable(area);
    }
  }
  
  isAttackingAreaClickable(attackingArea) {
    const { isRendered, currentPlayer } = this.state;

    if (!isRendered) {
      return false;
    }

    return currentPlayer.getAreas().includes(attackingArea) && currentPlayer === attackingArea.getPlayer();
  }

  isDefendingAreaClickable(area) {
    const { isRendered, currentPlayer, attackingArea } = this.state;
    if (!isRendered) {
      return false;
    }

    const defendingPlayer = area.player;

    return currentPlayer !== defendingPlayer || attackingArea.area === area;
  }

  onInputFieldChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  onCombatButtonClick() {
    const { attackingArea, defendingArea, attackingDice, defendingDice } = this.state;

    const combatController = new CombatController(
      attackingArea.area,
      defendingArea.area
    );
    combatController.handleCombat(attackingDice, defendingDice);
    this.resetCombatState();
  }
  
  resetCombatState() {
    this.setState({ attackingArea: null, defendingArea: null, attackingDice: 0, defendingDice: 0 });
  }

  onEndTurnClick() {
    const { game } = this.state;

    game.changeCurrentPlayer();
    const newCurrentPlayer = game.getCurrentPlayer();

    this.setState({ 
      currentPlayer: newCurrentPlayer, 
      attackingArea: null, 
      defendingArea: null,
      attackingDice: 0,
      defendingDice: 0
    });
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
              isRendered={this.state.isRendered}
              isAreaClickable={this.isAreaClickable}
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
        <button class="endTurnButton" onClick={this.onEndTurnClick} >End Turn</button>
      </>
    );
  }
}

export default Map;
