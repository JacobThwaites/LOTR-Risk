import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';
import { Player } from '../Models/Player';
import { Colour } from '../Enums/Colours';
import { Game } from '../Models/Game';
import { assert } from 'chai';
import 'mocha';

describe('Game', () => {
    let player1: Player;
    let player2: Player;
    let playersList: Array<Player>;
    let area1: Area;
    let area2: Area;
    let game: Game;
    beforeEach(function () {
        player1 = new Player('Biff', Colour.GREEN);
        player2 = new Player('Chip', Colour.RED);
        playersList = [player1, player2];
        area1 = new Area(AreaName.RHUDAUR);
        area2 = new Area(AreaName.ITHILIEN);
        player1.addArea(area1);
        player2.addArea(area2);
        game = new Game(playersList, 1);
    })

    it('have players', () => {
        const result = game.getPlayers();
        assert.strictEqual(result, playersList);
    });

    it('should keep track of the current player', () => {
        const result = game.getCurrentPlayer();
        assert.strictEqual(result, player1);
    });

    it('should be able to change who\'s turn it is', () => {
        game.changeCurrentPlayer();
        const result = game.getCurrentPlayer();
        assert.strictEqual(result, player2);
    });

    it('should be able to loop through players', () => {
        game.changeCurrentPlayer();
        game.changeCurrentPlayer();
        const result = game.getCurrentPlayer();
        assert.strictEqual(result, player1);
    });

    it('should be able to check if players have reinforcements remaining', () => {
        const startWithReinforcements = game.playersHaveReinforcements();
        assert.strictEqual(startWithReinforcements, false);
        player2.addReinforcements(1);
        const endWithReinforcements = game.playersHaveReinforcements();
        assert.strictEqual(endWithReinforcements, true);
    });

    it('should be able to check how many turns are remaining', () => {
        const turnsRemaining = game.getTurnsRemaining();
        assert.strictEqual(turnsRemaining, 1);
    });

    it('should be able to check if max turns have been reached and return false when not reached', () => {
        const maxTurnsReached = game.checkMaxTurnsReached();
        assert.strictEqual(maxTurnsReached, false);
    });

    it('should be able to check if max turns have been reached and return false when reached', () => {
        game.incrementCurrentTurn();
        const maxTurnsReached = game.checkMaxTurnsReached();
        assert.strictEqual(maxTurnsReached, true);
    });

    it('should increment the current turn when all players have finished their turn', () => {
        const firstPlayerTurn = game.checkMaxTurnsReached();
        assert.strictEqual(firstPlayerTurn, false);
        game.changeCurrentPlayer();
        const secondPlayerTurn = game.checkMaxTurnsReached();
        assert.strictEqual(secondPlayerTurn, false);
        game.changeCurrentPlayer();
        const thirdPlayerTurn = game.checkMaxTurnsReached();
        assert.strictEqual(thirdPlayerTurn, true);
    });    
});