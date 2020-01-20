import { Player } from "../Models/Player";
import { Areas } from "../Enums/Areas";
import shuffle from '../Services/Shuffle';

export class AreaAssigner {
  private players: Array<Player>;
  constructor(players: Array<Player>) {
    this.players = players;
  }

  assignAreas() {
    const areas = Object.values(Areas);
    const shuffledAreas = shuffle(areas);

    let playerIndex = 0;

    for (let i = 0; i < shuffledAreas.length; i++) {
      this.players[playerIndex].addArea(shuffledAreas[i]);
      shuffledAreas[i].setPlayer(this.players[playerIndex]);
      ++playerIndex;
    
      if (playerIndex >= this.players.length) {
        playerIndex = 0;
      }
    }
  }

  getPlayers() {
    return this.players;
  }
}