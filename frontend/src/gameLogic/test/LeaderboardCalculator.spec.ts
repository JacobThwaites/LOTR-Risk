import { assert } from 'chai';
import 'mocha';
// import { Player } from '../Models/Player';
// import { Area } from '../Models/Area';
// import { Game } from '../Models/Game';
// import { Colour } from '../Enums/Colours';
// import { AreaName } from '../Enums/AreaNames';
// import LeaderboardCalculator from '../Controllers/Leaderboard/LeaderboardCalculator';

describe('LeaderboardCalculator', () => {
    // let player1: Player;
    // let player2: Player;
    // let player3: Player;
    // let playersList: Array<Player>;
    // let area1: Area;
    // let area2: Area;
    // let area3: Area;
    // let area4: Area;
    // let area5: Area;
    // let area6: Area;
    // let game: Game;
    // beforeEach(function () {
    //     player1 = new Player(1, Colour.GREEN, 'userID');
    //     player2 = new Player(2, Colour.RED, 'userID');
    //     player3 = new Player(3, Colour.BLACK, 'userID');
    //     playersList = [player1, player2, player3];
    //     area1 = new Area(AreaName.RHUDAUR);
    //     area2 = new Area(AreaName.ITHILIEN);
    //     area3 = new Area(AreaName.ITHILIEN);
    //     area4 = new Area(AreaName.ITHILIEN);
    //     area5 = new Area(AreaName.ITHILIEN);
    //     area6 = new Area(AreaName.ITHILIEN);
    //     game = new Game(playersList, 1);
    // })

    it('should return players firstly ordered by total areas controlled', () => {
        // player1.addArea(area1);

        // player2.addArea(area2);
        // player2.addArea(area3);
        
        // player3.addArea(area4)
        // player3.addArea(area5)
        // player3.addArea(area6)

        // const leaderboard = LeaderboardCalculator.getLeaderboard(game);
        
        // for (let i = 1; i < leaderboard.length; i++) {
        //     assert.isAtMost(leaderboard[i].areasControlled, leaderboard[i - 1].areasControlled);
        // }
    });

    it('should return players secondly ordered by total units if areas controlled are equal', () => {
        // player1.addArea(area1);
        // player1.addArea(area2);

        // player2.addArea(area3);
        // player2.addArea(area4)
        
        // player3.addArea(area5)
        // player3.addArea(area6)

        // player1.addUnits(1);
        // player2.addUnits(2);
        // player3.addUnits(3);

        // const leaderboard = LeaderboardCalculator.getLeaderboard(game);
        
        // for (let i = 1; i < leaderboard.length; i++) {
        //     assert.isAtMost(leaderboard[i].totalUnits, leaderboard[i - 1].totalUnits);
        // }
    });
});