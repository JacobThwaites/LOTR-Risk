import { Player } from "../Models/Player";
import { Colour } from "../Enums/Colours";

export class PlayerController {
  private numberOfPlayers: number;
  private playerNames: string[];
  constructor(numberOfPlayers: number) {
    this.numberOfPlayers = numberOfPlayers;
    this.playerNames = ["player 1", "player 2", "player 3", "player 4"];
  }

  generatePlayers(): Player[] {
    const players = [];
    for (let i = 0; i < this.numberOfPlayers; i++) {
      const player = this.createPlayer(i);
      players.push(player);
    }

    return players;
  }

  createPlayer(index: number): Player {
    const playerName = this.playerNames[index];
    const colour = this.generateColour(index);
    const player = new Player(playerName, colour, true);
    return player;
  }

  generateColour(index: number): Colour {
    const colours = [Colour.Black, Colour.Green, Colour.Red, Colour.Yellow];
    return colours[index];
  }
}
