import { Player } from "../Models/Player";
import { Areas } from "../Enums/Areas";

export class AreaAssigner {
  private players: Array<Player>;
  constructor(players: Array<Player>) {
    this.players = players;
  }

  assignAreas() {
    const areas = Object.values(Areas);
    
    let playerIndex = 0;

    for (let i = 0; i < areas.length; i++) {
      this.players[playerIndex].addArea(areas[i]);
      areas[i].setPlayer(this.players[playerIndex]);
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