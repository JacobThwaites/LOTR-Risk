import { activeGames } from './ActiveGames';
import { assert } from 'chai';
import 'mocha';

describe('ActiveGames', () => {
    it('should create a game with a given userID and number of players', () => {
        const userID = '1234';
        const numPlayers = 2;
        const game = activeGames.createGame(userID, numPlayers);

        const players = game.getPlayers();
        assert.equal(2, players.length);
        assert.equal(userID, players[0].getUserID());
    });

    it('should create each game with a unique set of Area instances', () => {
        const game1 = activeGames.createGame('', 2);
        const game2 = activeGames.createGame('', 2);

        const game1Areas = game1.getAreas();
        const game2Areas = game2.getAreas();

        const game1Forlindon = game1Areas['FORLINDON'];
        const game2Forlindon = game2Areas['FORLINDON'];
        assert.notDeepEqual(game1Forlindon, game2Forlindon);
    });

    it('should get a game by a given gameID', () => {
        const createdGame = activeGames.createGame('userID', 2);
        const gameID = createdGame.getUUID();
        const game = activeGames.getGameByID(gameID);
        assert.equal(game.getUUID(), gameID);
    });

    it('should get a player by a given userID and gameID', () => {
        const userID = 'test'
        const createdGame = activeGames.createGame(userID, 2);
        const gameUUID = createdGame.getUUID();
        const player = activeGames.getPlayerByUserID(gameUUID, userID);
        assert.equal(player?.getUserID(), userID);
    });

    it('should delete a game by UUID', () => {
        const createdGame = activeGames.createGame('userID', 2);
        const gameUUID = createdGame.getUUID();
        activeGames.deleteGame(gameUUID);
        
        const game = activeGames.getGameByID(gameUUID);
        assert.isUndefined(game);
    });
});