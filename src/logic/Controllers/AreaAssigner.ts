import { Player } from "../Models/Player";
import { Area } from "../Models/Area";
import { Areas } from "../Enums/Areas";

export class AreaAssigner {
  private players: Array<Player>;
  constructor(players: Array<Player>) {
    this.players = players;
  }

  assignAreas() {
    const areas = Object.values(Areas);
    const shuffledAreas = this.shuffle(areas);

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

  shuffle(areas: Array<Area>) {
    let currentIndex = areas.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = areas[currentIndex];
      areas[currentIndex] = areas[randomIndex];
      areas[randomIndex] = temporaryValue;
    }
  
    return areas;
  }

  getPlayers() {
    return this.players;
  }
}