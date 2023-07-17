import React, { useEffect, useState, useRef } from "react";
import { GameGenerator } from "../gameLogic/Controllers/GameGenerator";
import { CombatController } from "../gameLogic/Controllers/CombatController";
import { ReinforcementController } from "../gameLogic/Controllers/ReinforcementController";
import { UnitMoveController } from "../gameLogic/Controllers/UnitMoveController";
import CombatHandler from "./CombatHandler";
import UnitMoveHandler from "./UnitMoveHandler";
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
import { addUserIDToGame } from "../gameLogic/Controllers/requests";
import { getAreas } from "../utils/playerAreaParser";
import WebSocketHandler, { GameEventType } from "../utils/WebSocketHandler";
import { Areas } from "../gameLogic/Enums/Areas";
import { AreaType } from "../gameLogic/Models/AreaType";
import WaitingForPlayers from "./WaitingForPlayers";
import Leaderboard from "./Leaderboard";
import RegionBonusInfo from "./RegionBonusInfo";
import TerritoryCardsDialog from "./TerritoryCardsDialog";
import { Player } from "../gameLogic/Models/Player";
import makeWebSocketHandler from "../utils/makeWebSocketHandler";
import TerritoryCardsButton from "./TerritoryCardsButton";
import NotFound from "./NotFound";
import { getUserID } from "../utils/userIDManager";
import PlayerDisconnectModal from "./PlayerDisconnectModal";
import { Colour } from "../gameLogic/Enums/Colours";
import areaDetails from "./svgPaths/AreaDetails";
import { AreaName } from "../gameLogic/Enums/AreaNames";

export default function GameDisplay() {
    const { gameID } = useParams<{ gameID: string }>();
    const [game, setGame] = useState<Game | null>(null);
    const [isGameLoaded, setIsGameLoaded] = useState(false);
    const [attackingArea, setAttackingArea] = useState<Area | null>(null);
    const [defendingArea, setDefendingArea] = useState<Area | null>(null);
    const [attackingDice, setAttackingDice] = useState<number>(1);
    const [shouldDisplayUnitMoveButton, setShouldDisplayUnitMoveButton] = useState<boolean>(false);
    const [shouldDisplayReinforcementsModal, setShouldDisplayReinforcementsModal] = useState<boolean>(false);
    const [shouldDisplayTroopTransferButton, setShouldDisplayTroopTransferButton] = useState<boolean>(false);
    const [shouldHandleStartingReinforcements, setShouldHandleStartingReinforcements] = useState<boolean>(true);
    const [shouldDisplayTerritoryCards, setShouldDisplayTerritoryCards] = useState<boolean>(false);
    const [areaToMoveUnits, setAreaToMoveUnits] = useState<Area | null>(null);
    const [areaToReceiveUnits, setAreaToReceiveUnits] = useState<Area | null>(null);
    const [unitsToMove, setUnitsToMove] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [disconnectedPlayers, setDisconnectedPlayers] = useState<Player[]>([]);
    const ws = useRef<WebSocket | null>();
    const webSocketHandler = useRef<WebSocketHandler | null>();
    const isWebSocketConnected = useRef<boolean>(); 
    const location: { state: { gameType?: string } } = useLocation();
    const gameType = location.state ? location.state.gameType : "online";
    const [userColour, setUserColour] = useState<Colour>();

    useEffect(() => {
        async function setupGame() {
            const res = await addUserIDToGame(gameID);

            if (!res.ok) {
                return;
            }

            const json = await res.json();
            const areaNames = getPlayerAreaNames(json.data.players);
            const areas = getAreas(areaNames);
            const playerIDs = json.data.players.map((p: any) => { return p.id });
            const userIDs = json.data.players.map((p: any) => { return p.userID });
            const game = GameGenerator.generateGame(areas, playerIDs, userIDs);
            setupStartingAreaColours(areas);
            setGame(game);
            setShouldDisplayReinforcementsModal(true);
            setIsGameLoaded(true);
            
            const players = game.getPlayers();
            for (let i = 0; i < players.length; i++) {
                if (players[i].getUserID() === getUserID()) {
                    setUserColour(players[i].getColour());
                }
            }
        }

        setupGame();
    }, [gameID])

    useEffect(() => {
        if (!isWebSocketConnected.current && isGameLoaded) {
            connectSockets();
            isWebSocketConnected.current = true;
        }

        return () => {
            ws.current?.close();
            webSocketHandler.current?.socket.close();
            webSocketHandler.current = null;
            ws.current = null;
            isWebSocketConnected.current = false;
        }
    }, [gameID, isGameLoaded]);

    function connectSockets() {
        const socket = new WebSocket(`ws://${process.env.REACT_APP_BASE_URL}/api/game/${gameID}`);
        const socketHandler = makeWebSocketHandler(gameID, socket);

        socket.onopen = () => {
            webSocketHandler.current!.sendPlayerJoinedNotification();
        };

        socket.onmessage = (event) => {
            processWebSocketMessage(event);
        };

        socket.onclose = () => {
            console.log('Closed socket connection');
        }

        webSocketHandler.current = socketHandler;

        ws.current = socket;
    }

    function processWebSocketMessage(event: MessageEvent): void {
        const messageData = JSON.parse(event.data);
        console.log(messageData);
        
        if (webSocketHandler.current!.isMessageAlreadyProcessed(messageData.id)) {
            return;
        } else {
            webSocketHandler.current!.previousMessageUUID = messageData.id;
        }

        switch (messageData.type) {
            case GameEventType.COMBAT_SETUP: {
                const attackingArea = Areas[messageData.attackingArea];
                const defendingArea = Areas[messageData.defendingArea];
                setAttackingArea(attackingArea);
                setDefendingArea(defendingArea);        
                break;
            }
            case GameEventType.PLAYER_JOINED: {
                const newDisconnectedPlayers = disconnectedPlayers.filter(p => p.getUserID() !== messageData.userID)
                setDisconnectedPlayers(newDisconnectedPlayers);
                game!.addUserIDToPlayer(messageData.userID);
                updateGameState(game!);
                break;
            }
            case GameEventType.CLEAR_SELECTED_AREAS: {
                setShouldDisplayUnitMoveButton(false);
                clearSelectedAreas();
                break;
            }
            case GameEventType.STARTING_REINFORCEMENT: {
                const area = Areas[messageData.areaName];
                handleStartingReinforcements(area);
                break;
            }
            case GameEventType.REINFORCEMENT: {
                const area = Areas[messageData.areaName];
                addReinforcements(area);
                break;
            }
            case GameEventType.COMBAT_RESULTS: {
                updateAreasAfterCombat(messageData.attackingArea, messageData.defendingArea, messageData.results);
                break;
            }
            case GameEventType.UNIT_MOVE: {
                const origin = Areas[messageData.origin];
                const destination = Areas[messageData.destination];
                onMoveUnits(origin, destination, messageData.numUnits);
                break;
            }
            case GameEventType.TROOP_TRANSFER_SETUP: {
                setShouldDisplayTroopTransferButton(true);
                break;
            }
            case GameEventType.TROOP_TRANSFER: {
                const origin = Areas[messageData.origin];
                const destination = Areas[messageData.destination];
                onMoveUnits(origin, destination, messageData.numUnits);
                break;
            }
            case GameEventType.END_TURN: {
                handleEndTurn();
                break;
            }
            case GameEventType.PLAYER_DISCONNECT: {
                handlePlayerDisconnect(messageData.user);
                break;
            }
            case GameEventType.GAME_OVER_DISCONNECT: {
                setIsGameOver(true);
                break;
            }
            case GameEventType.UPDATE_AREA: {
                updateAreaDetails(messageData);
                break;
            }
            default:
                break;
        }
    }

    function setupStartingAreaColours(areas: any) {
        for (let i = 0; i < areas.length; i++) {
            const playerAreas = areas[i];
            for (let j = 0; j < playerAreas.length; j++) {
                const areaName = playerAreas[j].name;
                const colour = playerAreas[j].player.colour;
                const area = areaDetails[areaName as AreaName];
                area.colour = colour;
            }
        }
    }

    // Required as React doesn't see changes in useState if it's an Object.
    function updateGameState(game: Game) {
        const newGame = new Game([], 30);
        Object.assign(newGame, game);
        setGame(newGame);
    }

    function getPlayerAreaNames(players: any): Array<Array<string>> {
        const playerAreas: any = [];

        for (let i = 0; i < players.length; i++) {
            playerAreas.push([]);
            const { areas } = players[i];
            for (let j = 0; j < areas.length; j++) {
                playerAreas[i].push(areas[j].name);       
            }
        }

        return playerAreas;
    }

    // TODO: handle on backend
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
            webSocketHandler.current!.sendClearAreaSelection();
        } else if (areaToReceiveUnits === area) {
            setAreaToReceiveUnits(null);
        } else if (areaToMoveUnits !== null) {
            setAreaToReceiveUnits(area);
            setShouldDisplayUnitMoveButton(true);
        } else {
            setAreaToMoveUnits(area);
        }
    }

    // TODO: handle on backend
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
        setAreaToMoveUnits(null);
        setAreaToReceiveUnits(null);
    }

    // TODO: move this to backend
    function handleCombat(): void {
        const combatController = new CombatController(
            attackingArea!,
            defendingArea!,
            game!
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
            defendingArea,
            game!
        );

        combatController.handleResults(results);

        if (defendingArea.hasNoUnitsRemaining()) {
            await setStateForUnitMove(attackingArea, defendingArea);
        }

        resetCombatState();
    }

    function setStateForUnitMove(attackingArea: any, defendingArea: any): void {
        setShouldDisplayUnitMoveButton(true);
        setAreaToMoveUnits(attackingArea);
        setAreaToReceiveUnits(defendingArea);
    }

    function resetCombatState(): void {
        setAttackingArea(null);
        setDefendingArea(null);
        setAttackingDice(1);
    }

    function onEndTurnClick(): void {
        if (shouldDisplayTroopTransferButton) {
            webSocketHandler.current!.sendEndTurn();
        } else {
            resetCombatState();
            webSocketHandler.current!.sendTroopTransferSetup();
        }
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
        const maxTurnsReached = game!.areMaxTurnsReached();

        if (maxTurnsReached) {
            setIsGameOver(true);
        }
    }

    function handlePlayerDisconnect(userID: string): void {
        const player = getPlayerByUserID(userID);

        if (player) {
            const newDisconnectedPlayers = [...disconnectedPlayers, player];
            setDisconnectedPlayers(newDisconnectedPlayers);
        }
    }

    function getPlayerByUserID(userID: string): Player | null {
        for (const player of game!.getPlayers()) {
            if (player.getUserID() === userID) {
                return player;
            }
        }

        return null;
    }

    function updateAreaDetails(messageData: any): void {
        const areaName: keyof typeof AreaName = messageData.areaName;
        const areaColour: Colour = messageData.areaColour as Colour;
        const area = areaDetails[areaName];
        area.units = messageData.areaUnits;
        area.colour = areaColour;
    }

    function onMoveUnitButtonClick(): void {
        if (!UnitMoveController.isMoveValid(areaToMoveUnits!, unitsToMove)) {
            return;
        }

        if (shouldDisplayTroopTransferButton) {
            webSocketHandler.current!.sendTroopTransfer(areaToMoveUnits!.getName(), areaToReceiveUnits!.getName(), unitsToMove);
            webSocketHandler.current!.sendEndTurn()
        } else {
            webSocketHandler.current!.sendUnitMove(areaToMoveUnits!.getName(), areaToReceiveUnits!.getName(), unitsToMove);
        }
    }

    function onMoveUnits(origin: AreaType, destination: AreaType, numUnits: number): void {
        const unitMoveController = new UnitMoveController(
            origin,
            destination
        );

        unitMoveController.moveUnits(numUnits);
        resetUnitMoveState();
    }

    function resetUnitMoveState(): void {
        setShouldDisplayUnitMoveButton(false);
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

    function isUnitMoveInputDisabled(): boolean {
        if (!isUsersTurn()) {
            return true;
        }

        if (shouldDisplayTroopTransferButton) {
            return (areaToMoveUnits === null || areaToReceiveUnits === null);
        }

        return false;
    }

    function isEndTurnButtonDisabled(): boolean {
        return (
            shouldDisplayUnitMoveButton ||
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

        return currentPlayer.getUserID() === getUserID();
    }

    function getUserCards() {
        const player = getUserPlayer();
        return player!.getTerritoryCards();
    }

    function getUserPlayer(): Player {
        if (gameType === 'local') {
            return game!.getCurrentPlayer();
        }

        const players = game!.getPlayers();
        for (let i = 0; i < players.length; i++) {
            if (players[i].getUserID() === getUserID()) {
                return players[i];
            }
        }

        return players[0];
    }

    if (!game) {
        return (<NotFound />);
    }

    if (game.waitingForUsersToJoin() && gameType === 'online') {
        const totalPlayersConnected = game!.getPlayers().reduce((acc, cur) => cur.getUserID() ? ++acc : acc, 0);
        const playersLeftToJoin = game!.getPlayers().length - totalPlayersConnected;
        return <WaitingForPlayers playersLeftToJoin={playersLeftToJoin} />
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
                userColour={userColour!}
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
            {(shouldDisplayUnitMoveButton || shouldDisplayTroopTransferButton) && (
                <UnitMoveHandler
                    max={areaToMoveUnits ? areaToMoveUnits.getUnits() - 1 : 0}
                    unitsToMove={unitsToMove}
                    onMoveUnits={onMoveUnitButtonClick}
                    setUnitsToMove={setUnitsToMove}
                    isInputDisabled={isUnitMoveInputDisabled()}
                    isInputEnabled={(shouldDisplayUnitMoveButton) || (shouldDisplayTroopTransferButton && areaToMoveUnits !== null)}
                    label={shouldDisplayTroopTransferButton ? "Troop Transfers: " : "Unit Maneuvers: "}
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
                shouldDisplayTroopTransferButton={shouldDisplayTroopTransferButton}
            />
            <Leaderboard game={game} />
            <TerritoryCardsButton onClick={() => setShouldDisplayTerritoryCards(true)} numCards={getUserCards().length} />
            {shouldDisplayTerritoryCards && (
                <TerritoryCardsDialog
                    onClose={() => setShouldDisplayTerritoryCards(false)}
                    cards={getUserCards()}
                    player={getUserPlayer()}
                    updateGameState={() => updateGameState(game!)}

                />
            )}
            {disconnectedPlayers.length > 0 && (
                disconnectedPlayers.map(player =>
                    <PlayerDisconnectModal key={player.getID()} playerColour={player.getColour()} />
                )
            )}
            {isGameOver && (
                <GameOverModal game={game} />
            )}
        </div>
    );
}