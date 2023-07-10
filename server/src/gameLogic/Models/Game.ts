import TerritoryCardManager from '../Controllers/TerritoryCardManager';
import { Player } from './Player';

export class Game {
    private players: Array<Player>;
    private maxTurns: number;
    private currentTurn: number;
    private currentPlayersTurn: number;
    private hasPlayerCapturedAreaThisTurn: boolean;
    constructor(players: Array<Player>, maxTurns: number) {
        this.players = players;
        this.maxTurns = maxTurns;
        this.currentTurn = 0;
        this.currentPlayersTurn = 0;
        this.hasPlayerCapturedAreaThisTurn = false;
    }

    public getPlayers(): Array<Player> {
        return this.players;
    }

    public getCurrentPlayer(): Player {
        const indexOfPlayer = this.currentPlayersTurn;
        return this.players[indexOfPlayer];
    }

    public getTurnsRemaining(): number {
        return this.maxTurns - this.currentTurn;
    }

    public handlePlayerCapturingArea(): void {
        this.hasPlayerCapturedAreaThisTurn = true;
    }

    public handleNewTurn() {
        if (this.hasPlayerCapturedAreaThisTurn) {
            this.giveCurrentPlayerTerritoryCard();
        }

        this.changeCurrentPlayer();
        const newCurrentPlayer = this.getCurrentPlayer();
        newCurrentPlayer.addReinforcementsForNewTurn();
    }

    public changeCurrentPlayer() {
        this.currentPlayersTurn += 1;
        const lastPlayer = this.players.length - 1;
        if (this.currentPlayersTurn > lastPlayer) {
            this.currentPlayersTurn = 0;
            this.incrementCurrentTurn();
        }
    }

    public assignStartingUnits() {
        const unitsAvailable = this.getStartingUnitsAvailable();

        for (let i = 0; i < this.players.length; i++) {
            this.players[i].addReinforcements(unitsAvailable);
            this.players[i].addStartingUnits();
        }
    }

    private getStartingUnitsAvailable(): number {
        // TODO: remove after testing
        return 34;
        // if (this.players.length === 2) {
        //     return 60;
        // } else if (this.players.length === 3) {
        //     return 52;
        // } else {
        //     return 45;
        // }
    }

    public playersHaveReinforcements(): boolean {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getReinforcements() > 0) {
                return true;
            }
        }

        return false;
    }

    private incrementCurrentTurn() {
        this.currentTurn++;
    }

    public checkMaxTurnsReached(): boolean {
        return this.maxTurns <= this.currentTurn;
    }

    public addUserIDToPlayer(userID: string) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getUserID() === userID) {
                return;
            } else if (!this.players[i].getUserID()) {
                this.players[i].setUserID(userID);
                return;
            }
        }
    }

    public waitingForUsersToJoin(): boolean {
        for (let i = 0; i < this.players.length; i++) {
            if (!this.players[i].getUserID()) {
                return true;
            }
        }

        return false;
    }

    private giveCurrentPlayerTerritoryCard(): void {
        const currentPlayer = this.getCurrentPlayer();
        TerritoryCardManager.givePlayerNewCard(currentPlayer);
        this.hasPlayerCapturedAreaThisTurn = false;
    }
}