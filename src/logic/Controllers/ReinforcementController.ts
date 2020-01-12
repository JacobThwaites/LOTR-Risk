import { Player } from '../Models/Player';
import { Area } from '../Models/Area';

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

    addReinforcements(area: Area) {
        this.player.addUnits(1);
        area.addUnits(1);
    }
}