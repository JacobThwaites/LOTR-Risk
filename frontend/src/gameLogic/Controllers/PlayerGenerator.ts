import { Player } from "../Models/Player";
import { Colour } from "../Enums/Colours";

export class PlayerGenerator {
  private playerIDs: number[];
  constructor(playerIDs: number[]) {
    this.playerIDs = playerIDs;
  }

  generatePlayers(): Player[] {
    const players = [];
    for (let i = 0; i < this.playerIDs.length; i++) {
      const playerID = this.playerIDs[i];
      const player = this.createPlayer(i, playerID);
      players.push(player);
    }

    return players;
  }

  createPlayer(index: number, id: number): Player {
    const colour = this.generateColour(index);
    const player = new Player(id, colour);
    return player;
  }

  generateColour(index: number): Colour {
    const colours = [Colour.BLACK, Colour.GREEN, Colour.RED, Colour.YELLOW];
    return colours[index];
  }
}
