import React, { useEffect, useState } from "react";
import { GameGenerator } from "../logic/Controllers/GameGenerator";
import { CombatController } from "../logic/Controllers/CombatController";
import { ReinforcementController } from "../logic/Controllers/ReinforcementController";
import { UnitManeuverController } from "../logic/Controllers/UnitManeuverController";
import CombatHandler from "./CombatHandler";
import UnitManeuverHandler from "./UnitManeuverHandler";
import Map from "./Map";
import EndTurnButton from "./buttons/EndTurnButton";
import ReinforcementsModal from "./ReinforcementsModal";
import GameOverModal from "./GameOverModal";
import TurnInformation from "./TurnInformation";
import { Combat } from '../logic/Enums/Combat';
import { CombatValidator } from "../logic/Controllers/CombatValidator";
import Chat from "./chat/Chat";
import { Game } from "../logic/Models/Game";
import { Area } from "../logic/Models/Area";
import { useParams } from "react-router";
import { Player } from "../logic/Models/Player";
import { getGame } from "../logic/Controllers/requests";
import { getAreas } from "../utils/playerAreaParser";

type PlayerResponseType = {
    "id": string,
    "name": string,
    "areas": string,
    "gameID": string
}

function GameDisplay(): JSX.Element {
    const [game, setGame] = useState<Game | null>(null);
    const [attackingArea, setAttackingArea] = useState<Area | null>(null);
    const [defendingArea, setDefendingArea] = useState<Area | null>(null);
    const [attackingDice, setAttackingDice] = useState<number>(1);
    const [defendingDice, setDefendingDice] = useState<number>(1);
    const [shouldDisplayUnitManeuverButton, setShouldDisplayUnitManeuverButton] = useState<boolean>(false);
    const [shouldDisplayReinforcementsModal, setShouldDisplayReinforcementsModal] = useState<boolean>(false);
    const [shouldHandleStartingReinforcements, setShouldHandleStartingReinforcements] = useState<boolean>(true);
    const [areaToMoveUnits, setAreaToMoveUnits] = useState<Area | null>(null);
    const [areaToReceiveUnits, setAreaToReceiveUnits] = useState<Area | null>(null);
    const [unitsToMove, setUnitsToMove] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [rerender, setRerender] = useState(false);
    const { gameID } = useParams<{ gameID: string }>();
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        setupGame();
    }, [])

    useEffect(() => {
        setSocket(new WebSocket(`ws://localhost:8001/api/game/${gameID}`));
    
        return () => {
          if (socket) {
            socket.close();
          }
        };
      }, [gameID]);

      useEffect(() => {
        if (!socket) {
          return;
        }
    
        socket.onopen = () => {
          console.log('Connected to the WebSocket server');
        };
    
        socket.onmessage = (event) => {
            console.log(event.data);
        };
      }, [socket]);

    async function setupGame() {
        const res = await getGame(gameID);
        const json = await res!.json(); 
        const areaNames = formatPlayerAreas(json.data.players);
        const areas = getAreas(areaNames);
        const gameGenerator = createGameGenerator(json.data.num_players);
        const game = gameGenerator.generateGame(areas);
        setGame(game);
        setShouldDisplayReinforcementsModal(true);
    }

    function formatPlayerAreas(playerData: Array<PlayerResponseType>): Array<string> {
        const playerAreas = [];

        for (let i = 0; i < playerData.length; i++) {
            playerAreas.push(playerData[i].areas);   
        }

        return playerAreas;
    }

    function createGameGenerator(numberOfPlayers: number): GameGenerator {
        const maxTurns = 30;
        const gameGenerator = new GameGenerator(numberOfPlayers, maxTurns);

        return gameGenerator;
    }

    function onAreaSelect(area: Area): void {
        const testMessage = {
            type: 'combat',
            attackingArea: attackingArea?.getName(),
            defendingArea: defendingArea?.getName()
        }

        socket?.send(JSON.stringify(testMessage));
        if (shouldHandleStartingReinforcements) {
            handleStartingReinforcements(area);
        } else if (shouldDisplayReinforcementsModal) {
            addReinforcements(area);
        } else {
            setAreaForCombat(area);
        }
    }

    function handleStartingReinforcements(area: Area): void {
        const currentPlayer = getCurrentPlayer();

        if (game!.playersHaveReinforcements()) {
            addReinforcements(area);

            if (currentPlayer!.getReinforcements() < 1) {
                game!.changeCurrentPlayer();
                setGame(game);
                setRerender(!rerender);
            }

            return;
        }

        game!.changeCurrentPlayer();
        setShouldDisplayReinforcementsModal(false);
        setShouldHandleStartingReinforcements(false)
    }

    function getCurrentPlayer(): Player | undefined {
        return game?.getCurrentPlayer();
    }

    function addReinforcements(area: Area): void {
        const reinforcementController = createReinforcementController();
        reinforcementController.addReinforcements(area);
        setRerender(!rerender);

        if (shouldHideReinforcementsModal()) {
            setShouldDisplayReinforcementsModal(false);
        }
    }

    function createReinforcementController(): ReinforcementController {
        const currentPlayer = getCurrentPlayer();
        const reinforcementController = new ReinforcementController(currentPlayer!);
        return reinforcementController;
    }

    function shouldHideReinforcementsModal(): boolean {
        const currentPlayer = getCurrentPlayer();
        const reinforcementsAvailable = currentPlayer!.getReinforcements();
        return reinforcementsAvailable < 1 && !shouldHandleStartingReinforcements
    }

    function setAreaForCombat(area: Area): void {
        if (attackingArea === area) {
            setAttackingArea(null);
            setDefendingArea(null);
        } else if (defendingArea === area) {
            setDefendingArea(null);
        } else if (attackingArea !== null) {
            setDefendingArea(area);
        } else {
            setAttackingArea(area);
        }
    }

    async function onCombatButtonClick() {
        handleCombat();

        if (!defendingArea) {
            return;
        }

        if (!defendingArea.hasUnitsRemaining()) {
            await setStateForManeuvers();
        }

        resetCombatState();
    }

    function handleCombat(): void {
        const combatController = createCombatController();
        combatController!.handleCombat(attackingDice, defendingDice);
    }

    function createCombatController(): CombatController {
        const combatController = new CombatController(
            attackingArea!,
            defendingArea!
        );

        return combatController;
    }

    function setStateForManeuvers(): void {
        setShouldDisplayUnitManeuverButton(true);
        setAreaToMoveUnits(attackingArea);
        setAreaToReceiveUnits(defendingArea);
    }

    function resetCombatState(): void {
        setAttackingArea(null);
        setDefendingArea(null);
        setAttackingDice(1);
        setDefendingDice(1);
    }

    function onEndTurnClick(): void {
        game!.handleNewTurn();
        setShouldDisplayReinforcementsModal(true);
        resetCombatState();
        checkIfGameOver();
    }

    function checkIfGameOver(): void {
        const maxTurnsReached = game!.checkMaxTurnsReached();

        if (maxTurnsReached) {
            setIsGameOver(true);
        }
    }

    function onMoveUnits(): void {
        const unitManeuverController = createUnitManeuverController();
        const areUnitsMoved = unitManeuverController.handleManeuver(unitsToMove);

        if (areUnitsMoved) {
            resetManeuverState();
        }
    }

    function createUnitManeuverController(): UnitManeuverController {
        const unitManeuverController = new UnitManeuverController(
            areaToMoveUnits!,
            areaToReceiveUnits!
        );

        return unitManeuverController;
    }

    function resetManeuverState(): void {
        setShouldDisplayUnitManeuverButton(false);
        setAreaToMoveUnits(null);
        setAreaToReceiveUnits(null);
        setUnitsToMove(0);
    }

    function getMaxAttackingDice(): number {
        const { MAX_ATTACKING_DICE } = Combat;
        return Math.min(MAX_ATTACKING_DICE, attackingArea!.getUnits() - 1);
    }

    function getMaxDefendingDice(): number {
        const { MAX_DEFENDING_DICE } = Combat;
        return Math.min(attackingDice, defendingArea!.getUnits(), MAX_DEFENDING_DICE);
    }

    function isCombatButtonClickable(): boolean {
        const combatValidator = new CombatValidator(attackingArea!, defendingArea!);
        const isValid = combatValidator.isCombatValid(attackingDice, defendingDice);
        return isValid;
    }

    function isMoveUnitsButtonDisabled(): boolean {
        return unitsToMove < 1;
    }

    function isEndTurnButtonDisabled(): boolean {
        return (
            shouldDisplayUnitManeuverButton ||
            shouldDisplayReinforcementsModal ||
            shouldHandleStartingReinforcements
        );
    }

    if (!game) {
        return (<></>);
    }

    const currentPlayer = getCurrentPlayer();
    return (
        <div id='game-display'>
            <Map
                attackingArea={attackingArea}
                defendingArea={defendingArea}
                attackingDice={attackingDice}
                currentPlayer={currentPlayer!}
                onAreaSelect={onAreaSelect}
            />
            <TurnInformation
                turnsRemaining={game!.getTurnsRemaining()}
                playerName={currentPlayer!.getName()}
            />
            <Chat
            // TODO: get player name 
                playerName={''}
            />
            {attackingArea && defendingArea && (
                <CombatHandler
                    attackingDice={attackingDice}
                    defendingDice={defendingDice}
                    maxAttackingDice={getMaxAttackingDice()}
                    maxDefendingDice={getMaxDefendingDice()}
                    onCombatButtonClick={onCombatButtonClick}
                    setAttackingDice={setAttackingDice}
                    setDefendingDice={setDefendingDice}
                    isCombatButtonClickable={isCombatButtonClickable()}
                />
            )}
            {shouldDisplayUnitManeuverButton && (
                <UnitManeuverHandler
                    max={areaToMoveUnits!.getUnits() - 1}
                    unitsToMove={unitsToMove}
                    onMoveUnits={onMoveUnits}
                    setUnitsToMove={setUnitsToMove}
                    isButtonDisabled={isMoveUnitsButtonDisabled()}
                />
            )}
            {shouldDisplayReinforcementsModal && (
                <ReinforcementsModal
                    reinforcementsAvailable={currentPlayer!.getReinforcements()}
                />
            )}
            <EndTurnButton
                onEndTurnClick={onEndTurnClick}
                isDisabled={isEndTurnButtonDisabled()}
            />
            {isGameOver && (
                <GameOverModal />
            )}
        </div>
    );
}

export default GameDisplay;