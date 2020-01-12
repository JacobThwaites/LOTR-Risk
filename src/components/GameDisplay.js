import React, { Component } from "react";
import { Player } from "../logic/Models/Player";
import { Colour } from "../logic/Enums/Colours";
import { AreaAssigner } from "../logic/Controllers/AreaAssigner";
import { GameController } from "../logic/Controllers/GameController";
import { CombatController } from "../logic/Controllers/CombatController";
import CombatHandler from "./CombatHandler";
import UnitManeuverHandler from "./UnitManeuverHandler";
import { UnitManeuverController } from "../logic/Controllers/UnitManeuverController";
import Map from "./Map";

class GameDisplay extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      game: null,
      currentPlayer: null,
      attackingArea: null,
      defendingArea: null,
      attackingDice: 0,
      defendingDice: 0,
      displayUnitManeuverButton: false,
      areaToMoveUnits: null,
      areaToReceiveUnits: null,
      unitsToMove: 0,
    };
    this.onAreaSelect = this.onAreaSelect.bind(this);
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
    this.onEndTurnClick = this.onEndTurnClick.bind(this);
    this.onMoveUnits = this.onMoveUnits.bind(this);
    this.onCombatButtonClick = this.onCombatButtonClick.bind(this);
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


  onInputFieldChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  onEndTurnClick() {
    const { game } = this.state;

    game.changeCurrentPlayer();
    const newCurrentPlayer = game.getCurrentPlayer();

    this.setState({ currentPlayer: newCurrentPlayer });
    this.resetCombatState();
  }
  
  onMoveUnits() {
    const { areaToMoveUnits, areaToReceiveUnits, unitsToMove } = this.state;

    const unitManeuverController = new UnitManeuverController(areaToMoveUnits, areaToReceiveUnits);

    unitManeuverController.handleManeuver(unitsToMove);
    this.setState({ 
      displayUnitManeuverButton: false,
      areaToMoveUnits: null,
      areaToReceiveUnits: null,
     });
  }

  async onCombatButtonClick() {
    const {
      attackingArea,
      defendingArea,
      attackingDice,
      defendingDice
    } = this.state;

    const combatController = new CombatController(
      attackingArea.area,
      defendingArea.area
    );
    combatController.handleCombat(attackingDice, defendingDice);
    if (defendingArea.area.getUnits() < 1) {
      await this.setState({
        displayUnitManeuverButton: true,
        areaToMoveUnits: attackingArea.area,
        areaToReceiveUnits: defendingArea.area
      });
    }

    this.resetCombatState();
  }

  resetCombatState() {
    this.setState({ attackingArea: null, defendingArea: null, attackingDice: 0, defendingDice: 0 });
  }

  render() {
    return (
      <>
        <Map 
            attackingArea={this.state.attackingArea}
            defendingArea={this.state.defendingArea}
            attackingDice={this.state.attackingDice}
            currentPlayer={this.state.currentPlayer}
            onAreaSelect={this.onAreaSelect}
        />
        {this.state.attackingArea && this.state.defendingArea && (
          <CombatHandler
            attackingDice={this.state.attackingDice}
            defendingDice={this.state.defendingDice}
            onCombatButtonClick={this.onCombatButtonClick}
            onInputFieldChange={this.onInputFieldChange}
          />
        )}
        {this.state.displayUnitManeuverButton && (
          <UnitManeuverHandler
            max={this.state.areaToMoveUnits.getUnits() - 1}
            unitsToMove={this.state.unitsToMove}
            onInputFieldChange={this.onInputFieldChange}
            onMoveUnits={this.onMoveUnits}
          />
        )}

        <button class="endTurnButton" onClick={this.onEndTurnClick}>
          End Turn
        </button>
      </>
    );
  }
}

export default GameDisplay;
