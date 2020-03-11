import React, { Component } from "react";
import { GameGenerator } from "../logic/Controllers/GameGenerator";
import { CombatController } from "../logic/Controllers/CombatController";
import { ReinforcementController } from "../logic/Controllers/ReinforcementController";
import { UnitManeuverController } from "../logic/Controllers/UnitManeuverController";
import CombatHandler from "./CombatHandler";
import UnitManeuverHandler from "./UnitManeuverHandler";
import Map from "./Map";
import EndTurnButton from "./EndTurnButton";
import ReinforcementsModal from "./ReinforcementsModal";
import GameOverModal from "./GameOverModal";
import TurnInformation from "./TurnInformation";
import { Combat } from '../logic/Enums/Combat'; 

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
      isGameOver: false,
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
    const gameGenerator = this.createGameGenerator();
    const game = gameGenerator.generateGame();
    this.setState({ game, shouldDisplayReinforcementsModal: true });
  }

  createGameGenerator() {
    const { numberOfPlayers } = this.props;
    const maxTurns = 30;
    const gameGenerator = new GameGenerator(numberOfPlayers, maxTurns);

    return gameGenerator;
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
    const { game } = this.state;
    const reinforcementController = this.createReinforcementController();
    reinforcementController.addReinforcements(area);
    this.setState({ game });

    if (this.shouldHideReinforcementsModal()) {
      this.setState({ shouldDisplayReinforcementsModal: false });
    }
  }

  createReinforcementController() {
    const { game } = this.state;
    const currentPlayer = game.getCurrentPlayer();
    const reinforcementController = new ReinforcementController(currentPlayer);
    return reinforcementController;
  }

  shouldHideReinforcementsModal() {
    const { game, shouldHandleStartingReinforcements } = this.state;
    const currentPlayer = game.getCurrentPlayer();
    const reinforcementsAvailable = currentPlayer.getReinforcements();
    return reinforcementsAvailable < 1 && !shouldHandleStartingReinforcements
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
    const { defendingArea } = this.state;
    this.handleCombat();
    
    if (!defendingArea.hasUnitsRemaining()) {
      await this.setStateForManeuvers();
    }

    this.resetCombatState();
  }

  handleCombat() {
    const { attackingDice, defendingDice } = this.state;
    const combatController = this.createCombatController();
    combatController.handleCombat(attackingDice, defendingDice);
  }

  createCombatController() {
    const {
      attackingArea,
      defendingArea,
    } = this.state;
    const combatController = new CombatController(
      attackingArea,
      defendingArea
    );

    return combatController;
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
      this.setState({ isGameOver: true });
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

  getCurrentPlayer() {
    const { game } = this.state;
    const currentPlayer = game.getCurrentPlayer();
    return currentPlayer;
  }

  getMaxAttackingDice() {
    const { attackingArea } = this.state;
    const { MAX_ATTACKING_DICE } = Combat;
    return Math.min(MAX_ATTACKING_DICE, attackingArea.getUnits() - 1);
  }

  getMaxDefendingDice() {
    const { defendingArea, attackingDice } = this.state;
    const { MAX_DEFENDING_DICE } = Combat;
    return Math.min(attackingDice, defendingArea.getUnits(), MAX_DEFENDING_DICE);
  }

  render() {
    if (!this.state.game) {
      return ('');
    }
    
    const currentPlayer = this.getCurrentPlayer();
    return (
      <div id='game-display'>
        <Map
          attackingArea={this.state.attackingArea}
          defendingArea={this.state.defendingArea}
          attackingDice={this.state.attackingDice}
          currentPlayer={currentPlayer}
          onAreaSelect={this.onAreaSelect}
        />
        <TurnInformation 
          turnsRemaining={this.getTurnsRemaining()}
          playerName={currentPlayer.getName()}
        />
        {this.state.attackingArea && this.state.defendingArea && (
          <CombatHandler
            attackingDice={this.state.attackingDice}
            defendingDice={this.state.defendingDice}
            maxAttackingDice={this.getMaxAttackingDice()}
            maxDefendingDice={this.getMaxDefendingDice()}
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
        {this.state.isGameOver && (
          <GameOverModal />
        )}
      </div>
    );
  }
}

export default GameDisplay;