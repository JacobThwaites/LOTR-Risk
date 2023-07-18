import { Player } from '../Models/Player';
import { AreaName } from '../Enums/AreaNames';
import areaDetails from '../../components/svgPaths/AreaDetails';

export class ReinforcementController {
    private player: Player;
    constructor(player: Player) {
        this.player = player;
    }

    addReinforcements(areaName: AreaName) {
        const areaDetail = areaDetails[areaName];
        areaDetail.units++;

        // Old
        this.player.removeReinforcement();
    }
}