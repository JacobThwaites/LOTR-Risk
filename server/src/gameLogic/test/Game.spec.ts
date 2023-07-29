import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';
import { Colour } from '../Enums/Colours';
import { Player } from '../Models/Player';
import { Game } from '../Models/Game';
import { CombatController } from '../Controllers/CombatController';
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
        player1 = new Player(Colour.GREEN, 'userID');
        player2 = new Player(Colour.RED, 'userID');
        playersList = [player1, player2];
        area1 = new Area(AreaName.RHUDAUR);
        area2 = new Area(AreaName.ITHILIEN);
        player1.addArea(area1);
        player2.addArea(area2);
        area1.setPlayer(player1);
        area2.setPlayer(player2);
        game = new Game(playersList, {}, 1);

        area1.addUnits(2);
        area2.addUnits(1);
    })

    it('should auto-generate an 8-character UUID', () => {
        const uuid = game.getUUID();
        assert.isString(uuid);
        assert.equal(uuid.length, 8);
    });

    it('should have players', () => {
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
        const maxTurnsReached = game.areMaxTurnsReached();
        assert.strictEqual(maxTurnsReached, false);
    });

    it('should increment the current turn when all players have finished their turn', () => {
        const firstPlayerTurn = game.areMaxTurnsReached();
        assert.strictEqual(firstPlayerTurn, false);
        game.changeCurrentPlayer();
        const secondPlayerTurn = game.areMaxTurnsReached();
        assert.strictEqual(secondPlayerTurn, false);
        game.changeCurrentPlayer();
        const thirdPlayerTurn = game.areMaxTurnsReached();
        assert.strictEqual(thirdPlayerTurn, true);
    });    

    it('should give a player a territory card at the end of a turn if they have captured a territory that turn', () => {
        player1.addArea(area1);
        assert.equal(player1.getTerritoryCards().length, 0);
        const combatController = new CombatController(area1, area2, game);
        combatController.handleResults(['attacker']);
        game.handleNewTurn();
        assert.equal(player1.getTerritoryCards().length, 1);
    });

    it('should not give a player a territory card at the end of a turn if they didn\'t capture a territory that turn', () => {
        assert.equal(player1.getTerritoryCards().length, 0);
        game.handleNewTurn();
        assert.equal(player1.getTerritoryCards().length, 0);
    });
});