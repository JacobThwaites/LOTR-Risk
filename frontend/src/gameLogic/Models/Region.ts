import { AreaType } from './AreaType';

export class Region {
    private name: string;
    private areas: Array<AreaType>;
    private bonusUnits: number;
    constructor(name: string, areas: Array<AreaType>, bonusUnits: number) {
        this.name = name;
        this.areas = areas;
        this.bonusUnits = bonusUnits;
    }

    getName(): string {
        return this.name;
    }

    getAreas(): Array<AreaType> {
        return this.areas;
    }

    getBonusUnits(): number {
        return this.bonusUnits;
    }
}