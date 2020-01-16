import { Player } from '../Models/Player';
import { Area } from '../Models/Area';

export class ReinforcementController {
    private player: Player;
    constructor(player: Player) {
        this.player = player;
    }

    getTotalReinforcementsAvailable() {
        return this.player.calculateTotalReinforcements();
    }

    addReinforcements(area: Area) {
        this.player.addReinforcementsToArea(1, area);
    }
}