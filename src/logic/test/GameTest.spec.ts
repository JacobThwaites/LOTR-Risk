import { Area } from '../Models/Area';
import { AreaName } from '../Enums/AreaNames';
import { Player } from '../Models/Player';
import { Region } from '../Models/Region';
import { assert } from 'chai';
import 'mocha';
import { Colour } from '../Enums/Colours';
import { Game } from '../Models/Game';
import { GameController } from '../Controllers/GameController';

describe('Game', () => {
    let player1: Player;
    let player2: Player;
    let playersList: Array<Player>;
    let area1: Area;
    let area2: Area;
    let areasList: Array<Area>;
    let region1: Region;
    let region2: Region;
    let game: Game;
    let gameController: GameController;
    beforeEach(function () {
        player1 = new Player('Biff', Colour.Green, true);
        player2 = new Player('Chip', Colour.Red, false);
        playersList = [player1, player2];
        const adjacentAreas1 = [AreaName.WeatherHills, AreaName.Carrock, AreaName.Eregion];
        const adjacentAreas2 = [AreaName.DeadMarshes, AreaName.SouthIthilien, AreaName.MinasMorgul, AreaName.MinasTirith];
        area1 = new Area(AreaName.Rhudaur, true, false, adjacentAreas1);
        area2 = new Area(AreaName.Ithilien, false, true, adjacentAreas2);
        areasList = [area1, area2];
        player1.addArea(area1);
        player2.addArea(area2);
        region1 = new Region('Gondor', [area2], 5);
        region2 = new Region('Arnor', [area1], 7);
        const regionsList = [region1, region2];
        game = new Game(playersList, regionsList);
        gameController = new GameController(playersList, 10);
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

    it('should be able to assign units to all areas', () => {
        gameController.generateGame();
        let allAreasHaveUnits = true;

        for (let i = 0; i < areasList.length; i++) {
            if (areasList[i].getUnits() < 1) {
                allAreasHaveUnits = false;
                break;
            }
        }

        assert.strictEqual(allAreasHaveUnits, true);
    });
});