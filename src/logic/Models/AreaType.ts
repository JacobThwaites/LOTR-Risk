import { AreaName } from '../Enums/AreaNames';
import { Player } from './Player';
import { IDefendingBonus } from './IDefendingBonus';
import { NoDefendingBonus } from './NoDefendingBonus';

export abstract class AreaType {
    protected name: AreaName;
    protected defendingBonus: IDefendingBonus;
    protected isSiteOfPower: boolean; // TODO: refactor using strategy pattern
    protected player: Player | null;
    protected hasLeader: boolean;
    protected units: number;
    protected adjacentAreas: Array<AreaName>
    constructor(name: AreaName, isSiteOfPower: boolean, adjacentAreas: Array<AreaName>) {
        this.name = name;
        this.defendingBonus = new NoDefendingBonus();
        this.isSiteOfPower = isSiteOfPower;
        this.player = null;
        this.hasLeader = false;
        this.units = 0;
        this.adjacentAreas = adjacentAreas;
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