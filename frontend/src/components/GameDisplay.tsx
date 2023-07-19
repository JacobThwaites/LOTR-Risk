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
import { useParams, useLocation } from "react-router";
import { addUserIDToGame } from "../gameLogic/Controllers/requests";
import { getAreas } from "../utils/playerAreaParser";
import WebSocketHandler, { GameEventType } from "../utils/WebSocketHandler";
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
    const [attackingArea, setAttackingArea] = useState<AreaName | null>(null);
    const [defendingArea, setDefendingArea] = useState<AreaName | null>(null);
    const [attackingDice, setAttackingDice] = useState<number>(1);
    const [shouldDisplayUnitMoveButton, setShouldDisplayUnitMoveButton] = useState<boolean>(false);
    const [shouldDisplayReinforcementsModal, setShouldDisplayReinforcementsModal] = useState<boolean>(false);
    const [shouldDisplayTroopTransferButton, setShouldDisplayTroopTransferButton] = useState<boolean>(false);
    const [shouldHandleStartingReinforcements, setShouldHandleStartingReinforcements] = useState<boolean>(true);
    const [shouldDisplayTerritoryCards, setShouldDisplayTerritoryCards] = useState<boolean>(false);
    const [areaToMoveUnits, setAreaToMoveUnits] = useState<AreaName | null>(null);
    const [areaToReceiveUnits, setAreaToReceiveUnits] = useState<AreaName | null>(null);
    const [unitsToMove, setUnitsToMove] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [disconnectedPlayers, setDisconnectedPlayers] = useState<Colour[]>([]);
    const ws = useRef<WebSocket | null>();
    const webSocketHandler = useRef<WebSocketHandler | null>();
    const isWebSocketConnected = useRef<boolean>(); 
    const location: { state: { gameType?: string } } = useLocation();
    const gameType = location.state ? location.state.gameType : "online";
    const [reinforcementsAvailable, setReinforcementsAvailable] = useState<number>(0);
    const [currentPlayerColour, setCurrentPlayerColour] = useState<Colour>(Colour.BLACK);
    const [userColour, setUserColour] = useState<Colour>();

    useEffect(() => {
        async function setupGame() {
            const res = await addUserIDToGame(gameID);

            if (!res.ok) {
                return;
            }

            const json = await res.json();
            const { players } = json.data;
            setCurrentPlayerColour(players[0].colour);
            
            // TODO: old
            const areaNames = getPlayerAreaNames(json.data.players);
            const areas = getAreas(areaNames);
            const playerIDs = json.data.players.map((p: any) => { return p.id });
            const userIDs = json.data.players.map((p: any) => { return p.userID });
            const game = GameGenerator.generateGame(areas, playerIDs, userIDs);

            setupStartingAreaColours(areas);
            setGame(game);
            setShouldDisplayReinforcementsModal(true);
            setIsGameLoaded(true);
            
            for (let i = 0; i < players.length; i++) {
                if (players[i].userID === getUserID()) {
                    setUserColour(players[i].colour);
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
        
        if (webSocketHandler.current!.isMessageAlreadyProcessed(messageData.id)) {
            return;
        } else {
            webSocketHandler.current!.previousMessageUUID = messageData.id;
        }

        switch (messageData.type) {
            case GameEventType.COMBAT_SETUP: {
                setAttackingArea(messageData.attackingArea);
                setDefendingArea(messageData.defendingArea);        
                break;
            }
            case GameEventType.PLAYER_JOINED: {
                const newDisconnectedPlayers = disconnectedPlayers.filter(playerColour => playerColour !== messageData.colour)
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
                handleStartingReinforcements(messageData.areaName);
                break;
            }
            case GameEventType.REINFORCEMENT: {
                addReinforcements(messageData.areaName);
                break;
            }
            case GameEventType.COMBAT_RESULTS: {
                updateAreasAfterCombat(messageData.attackingArea, messageData.defendingArea, messageData.results);
                break;
            }
            case GameEventType.UNIT_MOVE: {
                onMoveUnits(messageData.origin, messageData.destination, messageData.numUnits);
                break;
            }
            case GameEventType.TROOP_TRANSFER_SETUP: {
                setShouldDisplayTroopTransferButton(true);
                break;
            }
            case GameEventType.TROOP_TRANSFER: {
                onMoveUnits(messageData.origin, messageData.destination, messageData.numUnits);
                break;
            }
            case GameEventType.END_TURN: {
                handleEndTurn();
                break;
            }
            case GameEventType.PLAYER_DISCONNECT: {
                setDisconnectedPlayers([...disconnectedPlayers, messageData.userColour]);
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
            case GameEventType.CHANGE_PLAYER: {
                setCurrentPlayerColour(messageData.playerColour);
                console.log("changed player");
                
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
    function onAreaSelect(areaName: AreaName): void {
        if (shouldHandleStartingReinforcements) {
            webSocketHandler.current!.sendStartingReinforcement(areaName);
        } else if (shouldDisplayReinforcementsModal) {
            webSocketHandler.current!.sendReinforcement(areaName);
        } else if (shouldDisplayTroopTransferButton) {
            setAreaForTroopTransfer(areaName);
        } else {
            setAreaForCombat(areaName);
        }
    }

    // TODO: fix this; currently not updating player reinforcements
    function handleStartingReinforcements(areaName: AreaName): void {
        const currentPlayer = game!.getCurrentPlayer();

        addReinforcements(areaName);

        if (currentPlayer!.getReinforcements() < 1) {
            game!.changeCurrentPlayer();
        }

        updateGameState(game!);

        if (!game!.playersHaveReinforcements()) {
            setShouldDisplayReinforcementsModal(false);
            setShouldHandleStartingReinforcements(false)
        }
    }

    function addReinforcements(areaName: AreaName): void {
        const reinforcementController = createReinforcementController();
        reinforcementController.addReinforcements(areaName);
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

    function setAreaForTroopTransfer(areaName: AreaName): void {
        if (areaToMoveUnits === areaName) {
            webSocketHandler.current!.sendClearAreaSelection();
        } else if (areaToReceiveUnits === areaName) {
            setAreaToReceiveUnits(null);
        } else if (areaToMoveUnits !== null) {
            setAreaToReceiveUnits(areaName);
            setShouldDisplayUnitMoveButton(true);
        } else {
            setAreaToMoveUnits(areaName);
        }
    }

    // TODO: handle on backend
    function setAreaForCombat(areaName: AreaName): void {
        if (attackingArea === areaName) {
            webSocketHandler.current!.sendClearAreaSelection();
        } else if (defendingArea === areaName) {
            setDefendingArea(null);
        } else if (attackingArea !== null) {
            setDefendingArea(areaName);
            webSocketHandler.current!.sendCombatInfo(attackingArea, areaName);
        } else {
            setAttackingArea(areaName);
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
        webSocketHandler.current!.sendCombatResults(attackingArea!, defendingArea!, results);
    }

    function onCombatButtonClick(): void {
        webSocketHandler.current!.sendCombat(attackingArea!, defendingArea!, attackingDice);
    }

    async function updateAreasAfterCombat(attackingArea: AreaName, defendingArea: AreaName, results: string[]) {
        const combatController = new CombatController(
            attackingArea,
            defendingArea,
            game!
        );

        combatController.handleResults(results);


        const defendingAreaDetail = areaDetails[defendingArea];

        if (defendingAreaDetail.units <= 0) {
            await setStateForUnitMove(attackingArea, defendingArea);
        }

        resetCombatState();
    }

    function setStateForUnitMove(attackingArea: AreaName, defendingArea: AreaName): void {
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

    function updateAreaDetails(messageData: any): void {
        const areaName: keyof typeof AreaName = messageData.areaName;
        const areaColour: Colour = messageData.areaColour as Colour;
        const area = areaDetails[areaName as AreaName];
        area.units = messageData.areaUnits;
        area.colour = areaColour;
    }

    function onMoveUnitButtonClick(): void {
        if (!UnitMoveController.isMoveValid(areaToMoveUnits!, unitsToMove)) {
            return;
        }

        if (shouldDisplayTroopTransferButton) {
            webSocketHandler.current!.sendTroopTransfer(areaToMoveUnits!, areaToReceiveUnits!, unitsToMove);
            webSocketHandler.current!.sendEndTurn()
        } else {
            webSocketHandler.current!.sendUnitMove(areaToMoveUnits!, areaToReceiveUnits!, unitsToMove);
        }
    }

    function onMoveUnits(origin: AreaName, destination: AreaName, numUnits: number): void {
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
        const attackingAreaDetail = areaDetails[attackingArea!];

        return Math.min(MAX_ATTACKING_DICE, attackingAreaDetail.units - 1);
    }

    function getMaxDefendingDice(): number {
        const { MAX_DEFENDING_DICE } = Combat;
        const defendingAreaDetail = areaDetails[defendingArea!];
        return Math.min(attackingDice, defendingAreaDetail.units, MAX_DEFENDING_DICE);
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
                playerName={`${currentPlayerColour} Player`}
            />
            <RegionBonusInfo />
            {attackingArea && defendingArea && (
                <CombatHandler
                    attackingDice={attackingDice}
                    maxAttackingDice={getMaxAttackingDice()}
                    onCombatButtonClick={onCombatButtonClick}
                    setAttackingDice={setAttackingDice}
                    isCombatButtonClickable={isCombatButtonClickable()}
                    isUsersTurn={isUsersTurn()}
                />
            )}
            {(shouldDisplayUnitMoveButton || shouldDisplayTroopTransferButton) && (
                <UnitMoveHandler
                    areaToMoveUnits={areaToMoveUnits}
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
                disconnectedPlayers.map(colour =>
                    <PlayerDisconnectModal key={colour} playerColour={colour} />
                )
            )}
            {isGameOver && (
                <GameOverModal game={game} />
            )}
        </div>
    );
}