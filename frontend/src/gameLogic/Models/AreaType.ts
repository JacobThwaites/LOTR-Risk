import { AreaName } from '../Enums/AreaNames';
import { Player } from './Player';
import { IDefendingBonus } from './IDefendingBonus';
import { NoDefendingBonus } from './NoDefendingBonus';
import { ISiteOfPower } from './ISiteOfPower';
import { NotSiteOfPower } from './NotSiteOfPower';

export abstract class AreaType {
    protected name: AreaName;
    protected defendingBonus: IDefendingBonus;
    protected isSiteOfPower: ISiteOfPower;
    protected player: Player | null;
    protected hasLeader: boolean;
    protected units: number;
    constructor(name: AreaName) {
        this.name = name;
        this.defendingBonus = new NoDefendingBonus();
        this.isSiteOfPower = new NotSiteOfPower();
        this.player = null;
        this.hasLeader = false;
        this.units = 0;
    }

    getName(): AreaName {
        return this.name;
    }

    getDefendingBonus(): number {
        return this.defendingBonus.getBonus();
    }
    
    getIsSiteOfPower(): boolean {
        return this.isSiteOfPower.isSiteOfPower();
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

    hasNoUnitsRemaining(): boolean {
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
}