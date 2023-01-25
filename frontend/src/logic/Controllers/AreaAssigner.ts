import { Player } from "../Models/Player";
import { AreaType } from "../Models/AreaType";
import { Areas } from "../Enums/Areas";
import shuffle from "../../utils/Shuffle";

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
      this.addAreaToPlayer(shuffledAreas[i], this.players[playerIndex]);
      playerIndex = this.incrementPlayerIndex(playerIndex);
    }
  }

  private addAreaToPlayer(area: AreaType, player: Player): void {
    player.addArea(area);
    area.setPlayer(player);
  }

  private incrementPlayerIndex(index: number): number {
    ++index;
    if (index >= this.players.length) {
      index = 0;
    }
    return index;
  }
}