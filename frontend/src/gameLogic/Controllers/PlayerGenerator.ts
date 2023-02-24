import { Player } from "../Models/Player";
import { Colour } from "../Enums/Colours";

export class PlayerGenerator {
  private playerIDs: number[];
  private userIDs: string[];
  constructor(playerIDs: number[], userIDs: string[]) {
    this.playerIDs = playerIDs;
    this.userIDs = userIDs;
  }

  generatePlayers(): Player[] {
    const players = [];
    for (let i = 0; i < this.playerIDs.length; i++) {
      const playerID = this.playerIDs[i];
      const userID = this.userIDs[i];
      const player = this.createPlayer(i, playerID, userID);
      players.push(player);
    }

    return players;
  }

  createPlayer(index: number, id: number, userID: string): Player {
    const colour = this.generateColour(index);
    const player = new Player(id, colour, userID);
    return player;
  }

  generateColour(index: number): Colour {
    const colours = [Colour.BLACK, Colour.GREEN, Colour.RED, Colour.YELLOW];
    return colours[index];
  }
}
