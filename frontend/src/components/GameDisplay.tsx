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
import { useParams, useLocation } from "react-router";
import { addUserIdToPlayer, getGame } from "../gameLogic/Controllers/requests";
import { getAreas } from "../utils/playerAreaParser";
import WebSocketHandler, { GameEventType } from "../utils/WebSocketHandler";
import { Areas } from "../gameLogic/Enums/Areas";
import { AreaType } from "../gameLogic/Models/AreaType";
import WaitingForPlayers from "./WaitingForPlayers";
import { v4 as uuidv4 } from 'uuid';
import Leaderboard from "./Leaderboard";
import RegionBonusInfo from "./RegionBonusInfo";

type PlayerResponseType = {
    "id": string,
    "name": string,
    "areas": string,
    "gameID": string
}

export default function GameDisplay() {
    const { gameID } = useParams<{ gameID: string }>();
    const [game, setGame] = useState<Game | null>(null);
    const [isGameLoaded, setIsGameLoaded] = useState(false);
    const [attackingArea, setAttackingArea] = useState<Area | null>(null);
    const [defendingArea, setDefendingArea] = useState<Area | null>(null);
    const [attackingDice, setAttackingDice] = useState<number>(1);
    const [shouldDisplayUnitManeuverButton, setShouldDisplayUnitManeuverButton] = useState<boolean>(false);
    const [shouldDisplayReinforcementsModal, setShouldDisplayReinforcementsModal] = useState<boolean>(false);
    const [shouldDisplayTroopTransferButton, setShouldDisplayTroopTransferButton] = useState<boolean>(false);
    const [shouldHandleStartingReinforcements, setShouldHandleStartingReinforcements] = useState<boolean>(true);
    const [areaToMoveUnits, setAreaToMoveUnits] = useState<Area | null>(null);
    const [areaToReceiveUnits, setAreaToReceiveUnits] = useState<Area | null>(null);
    const [unitsToMove, setUnitsToMove] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [userID] = useState(uuidv4());
    const ws = useRef<WebSocket>();
    const webSocketHandler = useRef<WebSocketHandler>();
    const location: {state: {gameType?: string}} = useLocation();
    const gameType = location.state?.gameType;

    useEffect(() => {
        async function setupGame() {
            const res = await getGame(gameID);
            const json = await res!.json();
            const areaNames = getPlayerAreaNames(json.data.players);
            const areas = getAreas(areaNames);
            const playerIDs = json.data.players.map((p: any) => {return p.id});
            const userIDs = json.data.players.map((p: any) => {return p.userID});
            const game = GameGenerator.generateGame(areas, playerIDs, userIDs);
            setGame(game);
            setShouldDisplayReinforcementsModal(true);
            setIsGameLoaded(true);
        }

        setupGame();
    }, [gameID])

    useEffect(() => {
        async function connectSockets() {
            // TODO: move base path to env file
            const socket = new WebSocket(`ws://localhost:8001/api/game/${gameID}`);
            const socketHandler = new WebSocketHandler(gameID, socket);
            webSocketHandler.current = socketHandler;
    
            socket.onopen = () => {
                console.log('Connected to the WebSocket server');
                onJoin();
            };
    
            socket.onmessage = (event) => {
                processWebSocketMessage(event);
            };
    
            socket.onclose = () => {
                console.log('Closed socket connection');
            }
    
            ws.current = socket;      
        }

        if (isGameLoaded) {
            connectSockets();
        }

        return () => {
            ws.current?.close();
            webSocketHandler.current?.closeSocket();
        }
    }, [isGameLoaded])

    function processWebSocketMessage(event: MessageEvent): void {
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
        } else if (messageData.type === GameEventType.PLAYER_JOINED) {
            game!.addUserIDToNextAvailablePlayer(messageData.userID);
            updateGameState(game!);
        } else if (messageData.type === GameEventType.CLEAR_SELECTED_AREAS) {
            clearSelectedAreas();
        } else if (messageData.type === GameEventType.STARTING_REINFORCEMENT) {
            const area = Areas[messageData.areaName];
            handleStartingReinforcements(area);
        } else if (messageData.type === GameEventType.REINFORCEMENT) {
            const area = Areas[messageData.areaName];
            addReinforcements(area);
        } else if (messageData.type === GameEventType.COMBAT_RESULTS) {
            updateAreasAfterCombat(messageData.attackingArea, messageData.defendingArea, messageData.results);
        } else if (messageData.type === GameEventType.UNIT_MANEURVRE) {
            const areaToMoveUnits = Areas[messageData.areaToMoveUnits];
            const areaToReceiveUnits = Areas[messageData.areaToReceiveUnits];
            onMoveUnits(areaToMoveUnits, areaToReceiveUnits, messageData.numUnits);
        } else if (messageData.type === GameEventType.TROOP_TRANSFER_SETUP) {
            setShouldDisplayTroopTransferButton(true);
        } else if (messageData.type === GameEventType.TROOP_TRANSFER) {
            const areaToMoveUnits = Areas[messageData.areaToMoveUnits];
            const areaToReceiveUnits = Areas[messageData.areaToReceiveUnits];
            onMoveUnits(areaToMoveUnits, areaToReceiveUnits, messageData.numUnits);
        }  else if (messageData.type === GameEventType.END_TURN) {
            console.log('end turn received')
            handleEndTurn();
        }
    }

    // Required as React doesn't see changes in useState if it's an Object.
    function updateGameState(game: Game) {
        const newGame = new Game([], 30);
        Object.assign(newGame, game);
        setGame(newGame);
    }

    async function onJoin() {
        const nextAvailablePlayer = game!.getNextUnusedPlayer();

        if (!nextAvailablePlayer) {
            return;
        }

        const playerResponse = await addUserIdToPlayer(nextAvailablePlayer, userID);

        if (!playerResponse) {
            console.log("Unable to join game");
        }

        webSocketHandler.current!.sendPlayerJoinedNotification(userID);
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
            webSocketHandler.current!.sendReinforcement(area.getName());
        } else if (shouldDisplayTroopTransferButton) {
            setAreaForTroopTransfer(area);
        } else {
            setAreaForCombat(area);
        }
    }

    function handleStartingReinforcements(area: Area): void {
        const currentPlayer = game!.getCurrentPlayer();

        addReinforcements(area);
        
        if (currentPlayer!.getReinforcements() < 1) {
            game!.changeCurrentPlayer();
        }

        updateGameState(game!);

        if (!game!.playersHaveReinforcements()) {
            setShouldDisplayReinforcementsModal(false);
            setShouldHandleStartingReinforcements(false)
        }
    }

    function addReinforcements(area: Area): void {
        const reinforcementController = createReinforcementController();
        reinforcementController.addReinforcements(area);
        updateGameState(game!);

        if (!game!.playersHaveReinforcements()) {
            setShouldDisplayReinforcementsModal(false);
        }
    }

    function createReinforcementController(): ReinforcementController {
        const currentPlayer = game!.getCurrentPlayer();
        const reinforcementController = new ReinforcementController(currentPlayer!);
        return reinforcementController;
    }

    function setAreaForTroopTransfer(area: Area): void {
        if (areaToMoveUnits === area) {
            setAreaToMoveUnits(null);
            // webSocketHandler.current!.sendClearAreaSelection();
        } else if (areaToReceiveUnits === area) {
            setAreaToReceiveUnits(null);
        } else if (areaToMoveUnits !== null) {
            setAreaToReceiveUnits(area);
            setShouldDisplayUnitManeuverButton(true);
            // webSocketHandler.current!.sendCombatInfo(attackingArea.getName(), area.getName());
        } else {
            setAreaToMoveUnits(area);
        }
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

    function handleCombat(): void {
        const combatController = new CombatController(
            attackingArea!,
            defendingArea!
        );
        
        const defendingDice = getMaxDefendingDice();
        const results = combatController.getCombatResults(attackingDice, defendingDice);
        webSocketHandler.current!.sendCombatResults(attackingArea!.getName(), defendingArea!.getName(), results);
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
    }

    function onEndTurnClick(): void {
        resetCombatState();
        webSocketHandler.current!.sendTroopTransferSetup();
    }
    
    function handleEndTurn(): void {
        game!.handleNewTurn();
        updateGameState(game!);
        setShouldDisplayTroopTransferButton(false);
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
        if (!UnitManeuverController.isManeuverValid(areaToMoveUnits!, unitsToMove)) {
            return;
        }

        if (shouldDisplayTroopTransferButton) {
            webSocketHandler.current!.sendTroopTransfer(areaToMoveUnits!.getName(), areaToReceiveUnits!.getName(), unitsToMove);
            webSocketHandler.current!.sendEndTurn()
        } else {
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
        if (!isUsersTurn()) {
            return false;
        }

        return CombatValidator.isCombatValid(attackingArea!, attackingDice);
    }

    function isMoveUnitsButtonDisabled(): boolean {
        return unitsToMove < 1 && !isUsersTurn();
    }

    function isEndTurnButtonDisabled(): boolean {
        return (
            shouldDisplayUnitManeuverButton ||
            shouldDisplayReinforcementsModal ||
            shouldHandleStartingReinforcements ||
            !isUsersTurn()
        );
    }

    function isUsersTurn(): boolean {
        if (!game) {
            return false;
        }

        if (gameType === 'local') {
            return true;
        }

        return currentPlayer.getUserID() === userID;
    }

    if (!game) {
        return (<></>);
    }

    if (game.waitingForUsersToJoin() && gameType === 'online') {
        const totalPlayersConnected = game!.getPlayers().reduce((acc, cur) => cur.getUserID()? ++acc : acc, 0);
        const playersLeftToJoin = game!.getPlayers().length - totalPlayersConnected;
        return <WaitingForPlayers playersLeftToJoin={playersLeftToJoin}/>
    }

    const currentPlayer = game!.getCurrentPlayer();
    return (
        <div id='game-display'>
            <Map
                attackingArea={attackingArea}
                defendingArea={defendingArea}
                attackingDice={attackingDice}
                troopTransferStart={areaToMoveUnits}
                troopTransferEnd={areaToReceiveUnits}
                currentPlayer={currentPlayer!}
                onAreaSelect={onAreaSelect}
                isUsersTurn={isUsersTurn()}
                isCombatPhase={!shouldDisplayTroopTransferButton}
            />
            <TurnInformation
                turnsRemaining={game!.getTurnsRemaining()}
                playerName={`${currentPlayer!.getColour()} Player`}
            />
            <RegionBonusInfo />
            {attackingArea && defendingArea && (
                <CombatHandler
                    attackingDice={attackingDice}
                    maxAttackingDice={getMaxAttackingDice()}
                    onCombatButtonClick={handleCombat}
                    setAttackingDice={setAttackingDice}
                    isCombatButtonClickable={isCombatButtonClickable()}
                    isUsersTurn={isUsersTurn()}
                />
            )}
            {shouldDisplayUnitManeuverButton && (
                <UnitManeuverHandler
                    max={areaToMoveUnits!.getUnits() - 1}
                    unitsToMove={unitsToMove}
                    onMoveUnits={onMoveUnitButtonClick}
                    setUnitsToMove={setUnitsToMove}
                    isButtonDisabled={isMoveUnitsButtonDisabled()}
                    isDisabled={!isUsersTurn()}
                />
            )}
            {shouldDisplayTroopTransferButton && (
                <h1>troop transfer</h1>
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
            <Leaderboard game={game}/>
            {isGameOver && (
                <GameOverModal game={game} />
            )}
        </div>
    );
}