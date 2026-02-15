import React, { useEffect, useState, useRef } from "react";
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
import { useParams } from "react-router";
import { addUserIDToGame } from "../gameLogic/Controllers/requests";
import WebSocketHandler, { GameEventType } from "../utils/WebSocketHandler";
import WaitingForPlayers from "./WaitingForPlayers";
import Leaderboard from "./Leaderboard";
import RegionBonusInfo from "./RegionBonusInfo";
import TerritoryCardsDialog from "./TerritoryCardsDialog";
import makeWebSocketHandler from "../utils/makeWebSocketHandler";
import TerritoryCardsButton from "./TerritoryCardsButton";
import NotFound from "./NotFound";
import { getUserID } from "../utils/userIDManager";
import PlayerDisconnectModal from "./PlayerDisconnectModal";
import { Colour } from "../gameLogic/Enums/Colours";
import areaDetails from "./svgPaths/AreaDetails";
import { AreaName } from "../gameLogic/Enums/AreaNames";
import { LeaderboardEntry } from "../gameLogic/Enums/LeaderboardEntry";
import makeWebSocket from "../utils/makeWebSocket";


export default function GameDisplay() {
    const { gameID } = useParams<{ gameID: string }>();
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
    const [gameType, setGameType] = useState<'online' | 'local' | null>(null);
    const [reinforcementsAvailable, setReinforcementsAvailable] = useState<number>(0);
    const [playerColours, setPlayerColours] = useState<Colour[]>([]);
    const [currentPlayerColour, setCurrentPlayerColour] = useState<Colour>(Colour.BLACK);
    const [userColour, setUserColour] = useState<Colour>();
    const [turnsRemaining, setTurnsRemaining] = useState<number>(1);
    const [playersLeftToJoin, setPlayersLeftToJoin] = useState<number>(1);
    const [territoryCards, setTerritoryCards] = useState<string[]>([]);
    const [leaderboardData, setLeadboardData] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        async function setupGame() {
            const res = await addUserIDToGame(gameID!);

            if (!res.ok) {
                return;
            }

            const json = await res.json();
            const { players } = json;
            const startingPlayer = players[0];

            setCurrentPlayerColour(startingPlayer.colour);  
            setReinforcementsAvailable(startingPlayer.reinforcements);          
            setTurnsRemaining(json.maxTurns);
            setupStartingAreaColours(players);
            setShouldDisplayReinforcementsModal(true);
            setIsGameLoaded(true);
            setGameType(json.gameType);
            
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
        const socket = makeWebSocket(gameID!);
        const socketHandler = makeWebSocketHandler(gameID!, socket);

        webSocketHandler.current = socketHandler;
        ws.current = socket;

        socket.onopen = () => {
            webSocketHandler.current!.sendPlayerJoinedNotification();
        };

        socket.onmessage = (event) => {
            processWebSocketMessage(event);
        };

        socket.onclose = () => {
            console.log('Closed socket connection');
        }
    }

    function processWebSocketMessage(event: MessageEvent): void {
        const messageData = JSON.parse(event.data);
        console.log(messageData);

        switch (messageData.type) {
            case GameEventType.PLAYER_JOINED: {
                const newDisconnectedPlayers = disconnectedPlayers.filter(playerColour => playerColour !== messageData.colour)
                setDisconnectedPlayers(newDisconnectedPlayers);
                setPlayersLeftToJoin(messageData.playersLeftToJoin)
                break;
            }
            case GameEventType.CLEAR_SELECTED_AREAS: {
                setShouldDisplayUnitMoveButton(false);
                clearSelectedAreas();
                break;
            }
            case GameEventType.STARTING_REINFORCEMENT: {
                addReinforcements(messageData.areaName);
                setReinforcementsAvailable(messageData.reinforcementsAvailable);
                break;
            }
            case GameEventType.REINFORCEMENT: {
                addReinforcements(messageData.areaName);
                break;
            }
            case GameEventType.LEADERBOARD_UPDATE: {
                setLeadboardData(messageData.leaderboardData);
                break;
            }
            case GameEventType.REINFORCEMENTS_AVAILABLE: {
                setReinforcementsAvailable(messageData.reinforcementsAvailable);

                if (!messageData.reinforcementsAvailable) {
                    setShouldDisplayReinforcementsModal(false);
                }
                break;
            }
            case GameEventType.COMBAT_RESULTS: {
                const { 
                    attackingAreaName, 
                    attackingAreaUnits, 
                    attackingAreaColour,
                    defendingAreaName,
                    defendingAreaUnits, 
                    defendingAreaColour
                } = messageData;

                updateAreaDetails(attackingAreaName, attackingAreaColour, attackingAreaUnits);
                updateAreaDetails(defendingAreaName, defendingAreaColour, defendingAreaUnits);
                
                resetCombatState();
                break;
            }
            case GameEventType.UNIT_MOVE_COMPLETE: {
                resetUnitMoveState();
                break;
            }
            case GameEventType.TROOP_TRANSFER_SETUP: {
                setAttackingArea(null);
                setDefendingArea(null);
                setShouldDisplayTroopTransferButton(true);
                break;
            }
            case GameEventType.TROOP_TRANSFER: {
                onMoveUnits(messageData.origin, messageData.destination, messageData.numUnits);
                break;
            }
            case GameEventType.TROOP_TRANSFER_COMPLETE: {
                resetUnitMoveState();
                break;
            }
            case GameEventType.END_TURN: {
                const { newCurrentPlayerColour, reinforcementsAvailable } = messageData;
                handleEndTurn(newCurrentPlayerColour as Colour, reinforcementsAvailable);
                break;
            }
            case GameEventType.PLAYER_DISCONNECT: {
                setDisconnectedPlayers([...disconnectedPlayers, messageData.userColour]);
                setPlayersLeftToJoin(messageData.playersLeftToJoin);
                break;
            }
            case GameEventType.GAME_OVER_DISCONNECT: {
                setIsGameOver(true);
                break;
            }
            case GameEventType.UPDATE_AREA: {
                const { areaName, areaColour, areaUnits } = messageData;
                updateAreaDetails(areaName, areaColour, areaUnits);
                break;
            }
            case GameEventType.CHANGE_PLAYER: {
                setCurrentPlayerColour(messageData.playerColour);   
                break;
            }
            case GameEventType.STARTING_REINFORCEMENTS_END: {
                setShouldDisplayReinforcementsModal(false);
                setShouldHandleStartingReinforcements(false);
                break;
            }
            case GameEventType.UNIT_MOVE_SETUP: {
                setStateForUnitMove(messageData.attackingArea, messageData.defendingArea);
                break;
            }
            case GameEventType.TERRITORY_CARDS: {
                setTerritoryCards(messageData.cards)
                break;
            }
            default:
                break;
        }
    }

    function setupStartingAreaColours(players: any) {
        for (let i = 0; i < players.length; i++) {
            const playerColour = players[i].colour;
            setPlayerColours([...playerColours, playerColour]);
            const playerAreas = players[i].areas;
            for (let j = 0; j < playerAreas.length; j++) {
                const areaName = playerAreas[j].name;
                const areaDetail = areaDetails[areaName as AreaName];
                areaDetail.colour = playerColour;
            }
        }
    }

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

    function addReinforcements(areaName: AreaName): void {
        const areaDetail = areaDetails[areaName];
        areaDetail.units++;
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

    function setAreaForCombat(areaName: AreaName): void {
        if (attackingArea === areaName) {
            webSocketHandler.current!.sendClearAreaSelection();
        } else if (defendingArea === areaName) {
            setDefendingArea(null);
        } else if (attackingArea !== null) {
            setDefendingArea(areaName);
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

    function onCombatButtonClick(): void {
        webSocketHandler.current!.sendCombat(attackingArea!, defendingArea!, attackingDice);
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

    function handleEndTurn(newCurrentPlayerColour: Colour, reinforcementsAvailable: number): void {
        setCurrentPlayerColour(newCurrentPlayerColour);
        setShouldDisplayTroopTransferButton(false);
        setShouldDisplayReinforcementsModal(true);
        setReinforcementsAvailable(reinforcementsAvailable);
        resetCombatState();
    }

    function updateAreaDetails(areaName: AreaName, areaColour: Colour, areaUnits: number): void {
        const area = areaDetails[areaName as AreaName];
        area.units = areaUnits;
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

    function sendTradeTerritoryCardsMessage(selectedCards: string[]): void {
        webSocketHandler.current!.sendTradeTerritoryCards(selectedCards);
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
        if (!isGameLoaded) {
            return false;
        }

        if (gameType === 'local') {
            return true;
        }

        return currentPlayerColour === userColour;
    }

    if (!isGameLoaded) {
        return (<NotFound />);
    }
    
    if (playersLeftToJoin && gameType === 'online') {
        return <WaitingForPlayers playersLeftToJoin={playersLeftToJoin} />
    }

    return (
        <div id='game-display' data-testid='game-display'>
            <Map
                attackingArea={attackingArea}
                defendingArea={defendingArea}
                attackingDice={attackingDice}
                troopTransferStart={areaToMoveUnits}
                troopTransferEnd={areaToReceiveUnits}
                currentPlayerColour={currentPlayerColour}
                onAreaSelect={onAreaSelect}
                isUsersTurn={isUsersTurn()}
                isCombatPhase={!shouldDisplayTroopTransferButton}
                userColour={gameType === 'online' ? userColour! : currentPlayerColour}
            />
            <TurnInformation
                turnsRemaining={turnsRemaining}
                playerName={`${currentPlayerColour} Player`}
                userColour={userColour}
                isOnlineGame={gameType === 'online'}
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
                    label={shouldDisplayTroopTransferButton ? "Troop Transfers: " : "Unit Maneuvers: "}
                />
            )}
            {shouldDisplayReinforcementsModal && (
                <ReinforcementsModal
                    reinforcementsAvailable={reinforcementsAvailable}
                />
            )}
            <EndTurnButton
                onEndTurnClick={onEndTurnClick}
                isDisabled={isEndTurnButtonDisabled()}
                shouldDisplayTroopTransferButton={shouldDisplayTroopTransferButton}
            />
            <Leaderboard leaderboardData={leaderboardData}/>
            <TerritoryCardsButton onClick={() => setShouldDisplayTerritoryCards(true)} numCards={territoryCards.length} />
            {shouldDisplayTerritoryCards && (
                <TerritoryCardsDialog
                    onClose={() => setShouldDisplayTerritoryCards(false)}
                    cards={territoryCards}
                    sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}
                />
            )}
            {disconnectedPlayers.length > 0 && (
                disconnectedPlayers.map(colour =>
                    <PlayerDisconnectModal key={colour} playerColour={colour} />
                )
            )}
            {isGameOver && (
                <GameOverModal leaderboardData={leaderboardData} />
            )}
        </div>
    );
}