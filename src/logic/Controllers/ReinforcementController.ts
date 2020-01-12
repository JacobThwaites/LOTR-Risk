import { Player } from '../Models/Player';

export class ReinforcementController {
    private player: Player;
    constructor(player: Player) {
        this.player = player;
    }

    getTotalReinforcementsAvailable() {
        let totalReinforments = 0;
        totalReinforments += this.player.calculateAreaBonus();
        totalReinforments += this.player.calculateRegionBonus();

        return totalReinforments;
    }
}