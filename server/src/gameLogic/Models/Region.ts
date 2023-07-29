import { AreaName } from '../Enums/AreaNames';
import { AreaType } from './AreaType';

export class Region {
    private name: string;
    private areaNames: Array<AreaName>;
    private bonusUnits: number;
    constructor(name: string, areaNames: Array<AreaName>, bonusUnits: number) {
        this.name = name;
        this.areaNames = areaNames;
        this.bonusUnits = bonusUnits;
    }

    getName(): string {
        return this.name;
    }

    getAreaNames(): Array<AreaName> {
        return this.areaNames;
    }

    getBonusUnits(): number {
        return this.bonusUnits;
    }
}