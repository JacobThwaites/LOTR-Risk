import { AreaName } from '../Enums/AreaNames';


export class Area {
    private name: AreaName;
    private isStronghold: boolean;
    private isSiteOfPower: boolean;
    private isOccupied: boolean;
    private hasLeader: boolean;
    private units: number;
    private adjacentAreas: Array<AreaName>
    constructor(name: AreaName, isStronghold: boolean, isSiteOfPower: boolean, adjacentAreas: Array<AreaName>) {
        this.name = name;
        this.isStronghold = isStronghold;
        this.isSiteOfPower = isSiteOfPower;
        this.isOccupied = false;
        this.hasLeader = false;
        this.units = 0;
        this.adjacentAreas = adjacentAreas;
    }
    getName(): string {
        return this.name;
    }

    getIsStronghold(): boolean {
        return this.isStronghold;
    }
    getIsSiteOfPower(): boolean {
        return this.isSiteOfPower;
    }

    getIsOccupied(): boolean {
        return this.isOccupied;
    }

    becomeOccupied() {
        this.isOccupied = true;
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