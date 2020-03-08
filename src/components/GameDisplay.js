import React, { Component } from "react";
import { Player } from "../logic/Models/Player";
import { Colour } from "../logic/Enums/Colours";
import { GameController } from "../logic/Controllers/GameController";
import { CombatController } from "../logic/Controllers/CombatController";
import { ReinforcementController } from "../logic/Controllers/ReinforcementController";
import { UnitManeuverController } from "../logic/Controllers/UnitManeuverController";
import CombatHandler from "./CombatHandler";
import UnitManeuverHandler from "./UnitManeuverHandler";
import Map from "./Map";
import EndTurnButton from "./EndTurnButton";
import ReinforcementsModal from "./ReinforcementsModal";
import GameOverModal from "./GameOverModal";
import TurnsRemaining from "./TurnsRemaining";

class GameDisplay extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      game: null,
      attackingArea: null,
      defendingArea: null,
      attackingDice: 1,
      defendingDice: 1,
      shouldDisplayUnitManeuverButton: false,
      shouldDisplayReinforcementsModal: false,
      shouldHandleStartingReinforcements: true,
      areaToMoveUnits: null,
      areaToReceiveUnits: null,
      unitsToMove: 0,
      reinforcementsAvailable: 0,
      gameOver: false,
    };
    this.onAreaSelect = this.onAreaSelect.bind(this);
    this.addReinforcements = this.addReinforcements.bind(this);
    this.onNumberSelect = this.onNumberSelect.bind(this);
    this.onEndTurnClick = this.onEndTurnClick.bind(this);
    this.onMoveUnits = this.onMoveUnits.bind(this);
    this.onCombatButtonClick = this.onCombatButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isRendered: true });
    this.setupGame();
  }

  setupGame() {
    const controller = this.createGameController();
    const game = controller.generateGame();
    this.setState({ game, shouldDisplayReinforcementsModal: true });
  }

  createGameController() {
    const player1 = new Player("player 1", Colour.Green, true);
    const player2 = new Player("player 2", Colour.Yellow, false);
    const players = [player1, player2];
    const gameController = new GameController(players, 30);

    return gameController;
  }

  onAreaSelect(area) {
    const { shouldDisplayReinforcementsModal, shouldHandleStartingReinforcements } = this.state;

    if (shouldHandleStartingReinforcements) {
      this.handleStartingReinforcements(area);
    } else if (shouldDisplayReinforcementsModal) {
      this.addReinforcements(area);
    } else {
      this.setAreaForCombat(area);
    }
  }

  handleStartingReinforcements(area) {
    const { game } = this.state;
    const currentPlayer = game.getCurrentPlayer();

    if (game.playersHaveReinforcements()) {
      if (currentPlayer.getReinforcements() < 1) {
        game.changeCurrentPlayer();
        this.setState({ game });
        return;
      }

      this.addReinforcements(area);
      return;
    }

    game.changeCurrentPlayer();
    this.setState({ shouldDisplayReinforcementsModal: false, shouldHandleStartingReinforcements: false });
  }

  addReinforcements(area) {
    const { game, shouldHandleStartingReinforcements } = this.state;
    const currentPlayer = game.getCurrentPlayer();
    const reinforcementController = new ReinforcementController(currentPlayer);

    reinforcementController.addReinforcements(area);
    const reinforcementsAvailable = currentPlayer.getReinforcements();
    this.setState({ game });

    if (reinforcementsAvailable < 1 && !shouldHandleStartingReinforcements) {
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
      attackingArea,
      defendingArea
    );
    combatController.handleCombat(attackingDice, defendingDice);
    
    if (!defendingArea.hasUnitsRemaining()) {
      await this.setStateForManeuvers();
    }

    this.resetCombatState();
  }
  
  setStateForManeuvers() {
    const { attackingArea, defendingArea } = this.state;
    this.setState({
      shouldDisplayUnitManeuverButton: true,
      areaToMoveUnits: attackingArea,
      areaToReceiveUnits: defendingArea
    });
  }

  resetCombatState() {
    this.setState({
      attackingArea: null,
      defendingArea: null,
      attackingDice: 1,
      defendingDice: 1
    });
  }

  onNumberSelect(number, b, a) {
    const { name } = a;
    this.setState({ [name]: number });
  }

  onEndTurnClick() {
    const { game } = this.state;
    
    game.handleNewTurn(); 
    this.setState({ shouldDisplayReinforcementsModal: true });
    this.resetCombatState();
    this.checkIfGameOver();
  }

  checkIfGameOver() {
    const { game } = this.state;
    const maxTurnsReached = game.checkMaxTurnsReached();

    if (maxTurnsReached) {
      this.setState({ gameOver: true });
    }
  }

  onMoveUnits() {
    const { unitsToMove } = this.state;
    const unitManeuverController = this.createUnitManeuverController();
    const areUnitsMoved = unitManeuverController.handleManeuver(unitsToMove);
    
    if (areUnitsMoved) {
      this.resetManeuverState();
    }
  }

  createUnitManeuverController() {
    const { areaToMoveUnits, areaToReceiveUnits } = this.state;
    const unitManeuverController = new UnitManeuverController(
      areaToMoveUnits,
      areaToReceiveUnits
    );

    return unitManeuverController;
  }

  resetManeuverState() {
    this.setState({
      shouldDisplayUnitManeuverButton: false,
      areaToMoveUnits: null,
      areaToReceiveUnits: null,
      unitsToMove: 0
    });
  }

  getTurnsRemaining() {
    const { game } = this.state;

    if (game === null) {
      return '';
    }

    return game.getTurnsRemaining();
  }

  render() {
    const currentPlayer = this.state.game
      ? this.state.game.getCurrentPlayer()
      : null;

    return (
      <div id='game-display'>
        <Map
          attackingArea={this.state.attackingArea}
          defendingArea={this.state.defendingArea}
          attackingDice={this.state.attackingDice}
          currentPlayer={currentPlayer}
          onAreaSelect={this.onAreaSelect}
        />
        <TurnsRemaining 
          turns={this.getTurnsRemaining()}
        />
        {this.state.attackingArea && this.state.defendingArea && (
          <CombatHandler
            attackingDice={this.state.attackingDice}
            defendingDice={this.state.defendingDice}
            onCombatButtonClick={this.onCombatButtonClick}
            onNumberSelect={this.onNumberSelect}
          />
        )}
        {this.state.shouldDisplayUnitManeuverButton && (
          <UnitManeuverHandler
            max={this.state.areaToMoveUnits.getUnits() - 1}
            unitsToMove={this.state.unitsToMove}
            onMoveUnits={this.onMoveUnits}
            onNumberSelect={this.onNumberSelect}
          />
        )}
        {this.state.shouldDisplayReinforcementsModal && (
          <ReinforcementsModal
            reinforcementsAvailable={currentPlayer.getReinforcements()}
          />
        )}
        <EndTurnButton onEndTurnClick={this.onEndTurnClick} />
        {this.state.gameOver && (
          <GameOverModal />
        )}
      </div>
    );
  }
}

export default GameDisplay;