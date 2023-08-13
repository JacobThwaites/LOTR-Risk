import { setupAreaAssignments } from "../gameLogic/Controllers/AreaAssigner";
import { GameGenerator } from "../gameLogic/Controllers/GameGenerator";
import { Game } from "../gameLogic/Models/Game";
import { Player } from "../gameLogic/Models/Player";

class ActiveGames {
    private gamesInProgress: {[gameID: string]: Game};
    constructor() {
        this.gamesInProgress = {};
    }

    public createGame(userID: string, numberOfPlayers: number): Game {
        const areas = setupAreaAssignments(numberOfPlayers);
        const game = GameGenerator.generateGame(areas, numberOfPlayers, userID);
        this.gamesInProgress[game.getUUID()] = game;
        return game;
    }

    public getGameByID(id: string): Game {
        return this.gamesInProgress[id];
    }

    public getPlayerByUserID(gameID: string, userID: string): Player | null {
        const game = this.getGameByID(gameID);
        const players = game.getPlayers();

        for (const player of players) {
            if (player.getUserID() === userID) {
                return player;
            }
        }

        return null;
    }

    public deleteGame(id: string): void {
        delete this.gamesInProgress[id];
    }

    public hasGameStarted(gameID: string): boolean {
        const game = this.getGameByID(gameID);
        const players = game.getPlayers();

        for (let i = 0; i < players.length; i++) {
            if (players[i].getUserID() === '') {
                return false;
            }
        }

        return true;
    }

    public removeUserIDFromGame(userID: string, gameID: string): void {
        const game = this.getGameByID(gameID);
        const players = game.getPlayers();
    
        for (const player of players) {
            if (player.getUserID() === userID) {
                player.setUserID('');
            }
        }
    }
}

export const activeGames = new ActiveGames();