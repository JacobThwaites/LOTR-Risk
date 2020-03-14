import { AreaName } from '../Enums/AreaNames';
import { Player } from './Player';
import { AreaType } from './AreaType';
import { HasDefendingBonus } from './HasDefendingBonus';

export class Stronghold extends AreaType {
    constructor(name: AreaName, isSiteOfPower = false, adjacentAreas: Array<AreaName>) {
        super(name, isSiteOfPower, adjacentAreas);
        this.defendingBonus = new HasDefendingBonus();
    }

    getName(): AreaName {
        return this.name;
    }

    getDefendingBonus(): number {
        return this.defendingBonus.getBonus();
    }
    
    getIsSiteOfPower(): boolean {
        return this.isSiteOfPower;
    }

    getPlayer(): Player | null {
        return this.player;
    }

    setPlayer(player: Player) {
        this.player = player;
    }

    getHasLeader(): boolean {
        return this.hasLeader;
    }

    changeHasLeader() {
        this.hasLeader = !this.hasLeader;
    }

    hasUnitsRemaining(): boolean {
        return this.units > 0;
    }

    getUnits(): number {
        return this.units;
    }

    addUnits(units: number) {
        this.units += units;
    }

    removeUnits(units: number) {
        this.units -= units;
    }

    getAdjacentAreas(): Array<AreaName> {
        return this.adjacentAreas;
    }

    belongsToPlayer(player: Player): boolean {
        return this.player === player;
    }

    isNextToArea(area: AreaType): boolean {
        return this.adjacentAreas.includes(area.getName());
    }
}