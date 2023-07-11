import { Player } from "../Models/Player";
import { Colour } from "../Enums/Colours";

export class PlayerGenerator {
  private userIDs: string[];
  constructor(userIDs: string[]) {
    this.userIDs = userIDs;
  }

  generatePlayers(numberOfPlayers: number): Player[] {
    const players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      const userID = this.userIDs[i];
      const player = this.createPlayer(i, userID);
      players.push(player);
    }

    return players;
  }

  createPlayer(index: number, userID: string): Player {
    const colour = this.generateColour(index);
    const player = new Player(colour, userID);
    return player;
  }

  generateColour(index: number): Colour {
    const colours = [Colour.BLACK, Colour.GREEN, Colour.RED, Colour.YELLOW];
    return colours[index];
  }
}
