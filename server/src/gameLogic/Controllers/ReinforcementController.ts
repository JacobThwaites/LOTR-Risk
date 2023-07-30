import { Player } from '../Models/Player';
import { AreaType } from '../Models/AreaType';

export class ReinforcementController {
    private player: Player;
    constructor(player: Player) {
        this.player = player;
    }

    addReinforcements(area: AreaType) {
        this.player.addReinforcementsToArea(area);
    }
}