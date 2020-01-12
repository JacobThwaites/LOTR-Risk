import React, { Component } from "react";
import { Player } from "../logic/Models/Player";
import { Colour } from "../logic/Enums/Colours";
import { AreaAssigner } from "../logic/Controllers/AreaAssigner";
import { GameController } from "../logic/Controllers/GameController";
import { CombatController } from "../logic/Controllers/CombatController";
import { ReinforcementController } from "../logic/Controllers/ReinforcementController";
import { UnitManeuverController } from "../logic/Controllers/UnitManeuverController";
import CombatHandler from "./CombatHandler";
import UnitManeuverHandler from "./UnitManeuverHandler";
import Map from "./Map";
import EndTurnButton from "./EndTurnButton";
import ReinforcementsModal from "./ReinforcementsModal";

class GameDisplay extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      game: null,
      attackingArea: null,
      defendingArea: null,
      attackingDice: 0,
      defendingDice: 0,
      shouldDisplayUnitManeuverButton: false,
      shouldDisplayReinforcementsModal: false,
      areaToMoveUnits: null,
      areaToReceiveUnits: null,
      unitsToMove: 0,
      reinforcementsAvailable: 0
    };
    this.onAreaSelect = this.onAreaSelect.bind(this);
    this.addReinforcements = this.addReinforcements.bind(this);
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
    this.setState({ game });
  }

  setupAreaAssigner() {
    const player1 = new Player("player 1", Colour.Green, true, 30);
    const player2 = new Player("player 2", Colour.Yellow, false, 30);
    const players = [player1, player2];
    const areaAssigner = new AreaAssigner(players);

    return areaAssigner;
  }

  onAreaSelect(area) {
    const { shouldDisplayReinforcementsModal } = this.state;

    if (shouldDisplayReinforcementsModal) {
      this.addReinforcements(area.area);
    } else {
      this.setAreaForCombat(area);
    }
  }

  addReinforcements(area) {
    const { game, reinforcementsAvailable } = this.state;
    const currentPlayer = game.getCurrentPlayer();
    const reinforcementController = new ReinforcementController(currentPlayer);

    reinforcementController.addReinforcements(area);
    this.setState(prevState => ({
      reinforcementsAvailable: prevState.reinforcementsAvailable - 1
    }));

    if (reinforcementsAvailable <= 1) {
      this.setState({ shouldDisplayReinforcementsModal: false });
    }
  }

  setAreaForCombat(area) {
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
        shouldDisplayUnitManeuverButton: true,
        areaToMoveUnits: attackingArea.area,
        areaToReceiveUnits: defendingArea.area
      });
    }

    this.resetCombatState();
  }

  resetCombatState() {
    this.setState({
      attackingArea: null,
      defendingArea: null,
      attackingDice: 0,
      defendingDice: 0
    });
  }

  onInputFieldChange(event) {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value });
  }

  onEndTurnClick() {
    const { game } = this.state;

    game.changeCurrentPlayer();
    const reinforcementsAvailable = this.getTotalReinforcementsAvailable();
    this.setState({
      shouldDisplayReinforcementsModal: true,
      reinforcementsAvailable
    });
    this.resetCombatState();
  }

  onMoveUnits() {
    const { areaToMoveUnits, areaToReceiveUnits, unitsToMove } = this.state;
    const unitManeuverController = new UnitManeuverController(
      areaToMoveUnits,
      areaToReceiveUnits
    );

    unitManeuverController.handleManeuver(unitsToMove);
    this.setState({
      shouldDisplayUnitManeuverButton: false,
      areaToMoveUnits: null,
      areaToReceiveUnits: null,
      unitsToMove: 0
    });
  }

  getTotalReinforcementsAvailable() {
    const { game } = this.state;
    const currentPlayer = game.getCurrentPlayer();
    const reinforcementController = new ReinforcementController(currentPlayer);

    return reinforcementController.getTotalReinforcementsAvailable();
  }

  render() {
    const currentPlayer = this.state.game ? this.state.game.getCurrentPlayer() : null;

    return (
      <>
        <Map
          attackingArea={this.state.attackingArea}
          defendingArea={this.state.defendingArea}
          attackingDice={this.state.attackingDice}
          currentPlayer={currentPlayer}
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
        {this.state.shouldDisplayUnitManeuverButton && (
          <UnitManeuverHandler
            max={this.state.areaToMoveUnits.getUnits() - 1}
            unitsToMove={this.state.unitsToMove}
            onInputFieldChange={this.onInputFieldChange}
            onMoveUnits={this.onMoveUnits}
          />
        )}
        {this.state.shouldDisplayReinforcementsModal && (
          <ReinforcementsModal
            reinforcementsAvailable={this.state.reinforcementsAvailable}
          />
        )}
        <EndTurnButton onEndTurnClick={this.onEndTurnClick} />
      </>
    );
  }
}

export default GameDisplay;
