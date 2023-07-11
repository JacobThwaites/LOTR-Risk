import { setupAreaAssignments } from "../gameLogic/Controllers/AreaAssigner";
import { GameGenerator } from "../gameLogic/Controllers/GameGenerator";
import { Game } from "../gameLogic/Models/Game";

class ActiveGames {
    private gamesInProgress: {[gameID: string]: Game};
    constructor() {
        this.gamesInProgress = {};
    }

    public createGame(userIDs: string[], numberOfPlayers: number): Game {
        const areas = setupAreaAssignments(numberOfPlayers);
        const game = GameGenerator.generateGame(areas, numberOfPlayers, userIDs);
        this.gamesInProgress[game.getUUID()] = game;
        return game;
    }

    public getGameByID(id: string): Game {
        return this.gamesInProgress[id];
    }

    public deleteGame(id: string): void {
        delete this.gamesInProgress[id];
    }
}

export const activeGames = new ActiveGames();