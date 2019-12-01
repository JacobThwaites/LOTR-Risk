import { Player } from "../Models/Player";
import { Colour } from "../Enums/Colours";
import { AreaAssigner } from "../Controllers/AreaAssigner";
import { assert } from "chai";
import "mocha";

describe("AreaAssigner", () => {
  let assigner: AreaAssigner;
  let player1: Player;
  let player2: Player;
  beforeEach(function() {
    player1 = new Player("player 1", Colour.Green, true, 30);
    player2 = new Player("player 2", Colour.Green, true, 30);

    const players = [player1, player2];
    assigner = new AreaAssigner(players);
  });

  it('should be able to assign an area to a player', () => {
      const before = player1.getAreas().length;
      assert.equal(before, 0)

      assigner.assignAreas();

      const after = player1.getAreas().length;
      assert.isAbove(after, 0);
  });
});
