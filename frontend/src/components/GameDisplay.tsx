import React, { useEffect, useState, useRef } from "react";
import { GameGenerator } from "../gameLogic/Controllers/GameGenerator";
import { CombatController } from "../gameLogic/Controllers/CombatController";
import { ReinforcementController } from "../gameLogic/Controllers/ReinforcementController";
import { UnitManeuverController } from "../gameLogic/Controllers/UnitManeuverController";
import CombatHandler from "./CombatHandler";
import UnitManeuverHandler from "./UnitManeuverHandler";
import Map from "./Map";
import EndTurnButton from "./buttons/EndTurnButton";
import ReinforcementsModal from "./ReinforcementsModal";
import GameOverModal from "./GameOverModal";
import TurnInformation from "./TurnInformation";
import { Combat } from '../gameLogic/Enums/Combat';
import { CombatValidator } from "../gameLogic/Controllers/CombatValidator";
import { Game } from "../gameLogic/Models/Game";
import { Area } from "../gameLogic/Models/Area";
import { useParams } from "react-router";
import { addUserIdToPlayer, getGame } from "../gameLogic/Controllers/requests";
import { getAreas } from "../utils/playerAreaParser";
import WebSocketHandler, { GameEventType } from "../utils/WebSocketHandler";
import { Areas } from "../gameLogic/Enums/Areas";
import { AreaType } from "../gameLogic/Models/AreaType";
import WaitingForPlayers from "./WaitingForPlayers";
import { v4 as uuidv4 } from 'uuid';

type PlayerResponseType = {
    "id": string,
    "name": string,
    "areas": string,
    "gameID": string
}

function GameDisplay() {
    const { gameID } = useParams<{ gameID: string }>();
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
    const [isGameAlreadyFull, setIsGameAlreadyFull] = useState(false);
    const [userID] = useState(uuidv4());
    const [totalPlayersConnected, setTotalPlayersConnected] = useState<number>(0);
    const ws = useRef<WebSocket>();
    const webSocketHandler = useRef<WebSocketHandler>();

    useEffect(() => {
        async function setupGame() {
            const res = await getGame(gameID);
            const json = await res!.json();
            const areaNames = getPlayerAreaNames(json.data.players);
            const areas = getAreas(areaNames);
            const playerIDs = json.data.players.map((p: any) => {return p.id});
            const game = GameGenerator.generateGame(areas, playerIDs);
            setGame(game);
            setShouldDisplayReinforcementsModal(true);
            return game;
        }

        async function connectSockets(game: Game) {
            const socketHandler = new WebSocketHandler(gameID);
            webSocketHandler.current = socketHandler;
            const socket = new WebSocket(`ws://localhost:8001/api/game/${gameID}`);
    
            socket.onopen = () => {
                console.log('Connected to the WebSocket server');
                onJoin(game);
            };
    
            socket.onmessage = (event) => {
                processWebSocketMessage(event);
            };
    
            socket.onclose = () => {
                console.log('Closed socket connection');
            }
    
            ws.current = socket;
        }

        setupGame().then(game => {
            connectSockets(game);
        });

        return () => {
            ws.current!.close();
            webSocketHandler.current!.closeSocket();
        }
    }, [gameID])

    function processWebSocketMessage(event: any): void {
        const messageData = JSON.parse(event.data);

        if (webSocketHandler.current!.isMessageAlreadyProcessed(messageData.id)) {
            return;
        } else {
            webSocketHandler.current!.previousMessageUUID = messageData.id;
        }

        if (messageData.type === GameEventType.COMBAT) {
            const attackingArea = Areas[messageData.attackingArea];
            const defendingArea = Areas[messageData.defendingArea];
            setAttackingArea(attackingArea);
            setDefendingArea(defendingArea);
        } else if (messageData.type === GameEventType.CLEAR_SELECTED_AREAS) {
            clearSelectedAreas();
        } else if (messageData.type === GameEventType.STARTING_REINFORCEMENT) {
            const area = Areas[messageData.areaName];
            handleStartingReinforcements(area);
        } else if (messageData.type === GameEventType.COMBAT_RESULTS) {
            updateAreasAfterCombat(messageData.attackingArea, messageData.defendingArea, messageData.results);
        } else if (messageData.type === GameEventType.END_TURN) {
            handleEndTurn();
        } else if (messageData.type === GameEventType.UNIT_MANEURVRE) {
            const areaToMoveUnits = Areas[messageData.areaToMoveUnits];
            const areaToReceiveUnits = Areas[messageData.areaToReceiveUnits];
            onMoveUnits(areaToMoveUnits, areaToReceiveUnits, messageData.numUnits);
        } else if (messageData.type === GameEventType.PLAYER_JOINED) {
            setTotalPlayersConnected(totalPlayersConnected + 1);
            console.log('updated total players connected');
        }
    }

    async function onJoin(game: Game) {
        const nextAvailablePlayer = game.getNextUnusedPlayer();;

        if (!nextAvailablePlayer) {
            setIsGameAlreadyFull(true);
            return;
        }

        const playerResponse = await addUserIdToPlayer(nextAvailablePlayer, userID);

        if (!playerResponse) {
            console.log("Unable to join game");
        }

        webSocketHandler.current!.sendPlayerJoinedNotification();
    }

    function getPlayerAreaNames(playerData: Array<PlayerResponseType>): Array<string> {
        const playerAreas = [];

        for (let i = 0; i < playerData.length; i++) {
            playerAreas.push(playerData[i].areas);
        }

        return playerAreas;
    }

    function onAreaSelect(area: Area): void {
        if (shouldHandleStartingReinforcements) {
            webSocketHandler.current!.sendStartingReinforcement(area.getName());
        } else if (shouldDisplayReinforcementsModal) {
            addReinforcements(area);
        } else {
            setAreaForCombat(area);
        }
    }

    function handleStartingReinforcements(area: Area): void {
        const currentPlayer = game!.getCurrentPlayer();

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

    function addReinforcements(area: Area): void {
        const reinforcementController = createReinforcementController();
        reinforcementController.addReinforcements(area);
        setRerender(!rerender);

        if (shouldHideReinforcementsModal()) {
            setShouldDisplayReinforcementsModal(false);
        }
    }

    function createReinforcementController(): ReinforcementController {
        const currentPlayer = game!.getCurrentPlayer();
        const reinforcementController = new ReinforcementController(currentPlayer!);
        return reinforcementController;
    }

    function shouldHideReinforcementsModal(): boolean {
        const currentPlayer = game!.getCurrentPlayer();
        const reinforcementsAvailable = currentPlayer!.getReinforcements();
        return reinforcementsAvailable < 1 && !shouldHandleStartingReinforcements
    }

    function setAreaForCombat(area: Area): void {
        if (attackingArea === area) {
            webSocketHandler.current!.sendClearAreaSelection();
        } else if (defendingArea === area) {
            setDefendingArea(null);
        } else if (attackingArea !== null) {
            setDefendingArea(area);
            webSocketHandler.current!.sendCombatInfo(attackingArea.getName(), area.getName());
        } else {
            setAttackingArea(area);
        }
    }

    function clearSelectedAreas() {
        setAttackingArea(null);
        setDefendingArea(null);
    }

    async function onCombatButtonClick() {
        handleCombat(attackingArea!, defendingArea!);
    }

    function handleCombat(attackingArea: AreaType, defendingArea: AreaType): void {
        const combatController = new CombatController(
            attackingArea!,
            defendingArea!
        );

        const results = combatController!.getCombatResults(attackingDice, defendingDice);
        webSocketHandler.current!.sendCombatResults(attackingArea.getName(), defendingArea.getName(), results);
    }

    async function updateAreasAfterCombat(attackingAreaName: string, defendingAreaName: string, results: string[]) {
        const attackingArea = Areas[attackingAreaName];
        const defendingArea = Areas[defendingAreaName];
        const combatController = new CombatController(
            attackingArea,
            defendingArea
        );

        combatController.handleResults(results);

        if (!defendingArea.hasUnitsRemaining()) {
            await setStateForManeuvers(attackingArea, defendingArea);
        }

        resetCombatState();
    }

    function setStateForManeuvers(attackingArea: any, defendingArea: any): void {
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
        webSocketHandler.current!.sendEndTurn();
    }

    function handleEndTurn(): void {
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

    function onMoveUnitButtonClick(): void {
        if (UnitManeuverController.isManeuverValid(areaToMoveUnits!, unitsToMove)) {
            webSocketHandler.current!.sendUnitManeuvre(areaToMoveUnits!.getName(), areaToReceiveUnits!.getName(), unitsToMove);
        }
    }

    function onMoveUnits(areaToMoveUnits: AreaType, areaToReceiveUnits: AreaType, numUnits: number): void {
        const unitManeuverController = new UnitManeuverController(
            areaToMoveUnits!,
            areaToReceiveUnits!
        );

        unitManeuverController.moveUnits(numUnits);
        resetManeuverState();
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

    if (isGameAlreadyFull) {
        return <h1>There are no more spaces left to join the game :(</h1>;
    }

    const playersLeftToJoin = game!.getPlayers().length - totalPlayersConnected;

    if (playersLeftToJoin) {
        return <WaitingForPlayers playersLeftToJoin={playersLeftToJoin} />
    }

    const currentPlayer = game!.getCurrentPlayer();

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
                playerName={`${currentPlayer!.getColour()} Player`}
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
                    onMoveUnits={onMoveUnitButtonClick}
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