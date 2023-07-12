import { Player } from "../Models/Player";
import { AreaType } from "../Models/AreaType";

export class AreaAssigner {
  private players: Array<Player>;
  constructor(players: Array<Player>) {
    this.players = players;
  }

  assignAreas(areaLists: Array<AreaType[]>) {
    for (let i = 0; i < this.players.length; i++) {
      for (let j = 0; j < areaLists[i].length; j++) {
        this.addAreaToPlayer(areaLists[i][j], this.players[i]);
      }
      
    }
  }

  private addAreaToPlayer(area: AreaType, player: Player): void {
    player.addArea(area);
    area.setPlayer(player);
  }
}