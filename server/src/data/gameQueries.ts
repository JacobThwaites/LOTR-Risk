import { Game } from '../gameLogic/Models/Game';
import { activeGames } from "./ActiveGames";

function getByUUID(uuid: string): Game | boolean {
    const game = activeGames.getGameByID(uuid);

    if (!game) {
        return false;
    }

    return game;
}

function createGame(userID: string, numPlayers: number): Game {
    return activeGames.createGame(userID, numPlayers);
}

module.exports = {
    getByUUID,
    createGame
};