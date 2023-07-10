import { Player } from "../Models/Player";
import { AreaType } from "../Models/AreaType";
import { Areas } from "../Enums/Areas";
import shuffle from "../utils/Shuffle";

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

export function setupAreaAssignments(numPlayers: number): Array<AreaType[]> {
  const playerAreas: Array<Array<AreaType>> = create2DArray(numPlayers);

  const areas = Object.values(Areas);
  const shuffledAreas: AreaType[] = shuffle(areas);
  let playerIndex = 0;

  for (let i = 0; i < shuffledAreas.length; i++) {
    playerAreas[playerIndex].push(shuffledAreas[i]);

    ++playerIndex;
    if (playerIndex >= numPlayers) {
      playerIndex = 0;
    }
  }

  return playerAreas;
}

function create2DArray(length: number): Array<AreaType[]> {
  const arr: Array<Array<AreaType>> = [];

  for (let i = 0; i < length; i++) {
    arr.push([]);
  }

  return arr;
}