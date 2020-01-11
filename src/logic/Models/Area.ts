import { AreaName } from '../Enums/AreaNames';
import { Player } from '../Models/Player';

export class Area {
    private name: AreaName;
    private isStronghold: boolean;
    private isSiteOfPower: boolean;
    private player: Player | null;
    private hasLeader: boolean;
    private units: number;
    private adjacentAreas: Array<AreaName>
    constructor(name: AreaName, isStronghold: boolean, isSiteOfPower: boolean, adjacentAreas: Array<AreaName>) {
        this.name = name;
        this.isStronghold = isStronghold;
        this.isSiteOfPower = isSiteOfPower;
        this.player = null;
        this.hasLeader = false;
        // TODO: set starting units as 0 when starting component is created to assign units manually
        this.units = 4;
        this.adjacentAreas = adjacentAreas;
    }

    getName(): AreaName {
        return this.name;
    }

    getIsStronghold(): boolean {
        return this.isStronghold;
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

    hasUnitsReminaing(): boolean {
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
}