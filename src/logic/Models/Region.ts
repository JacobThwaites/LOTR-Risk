import { Area } from './Area';

export class Region {
    private name: string;
    private areas: Array<Area>;
    private bonusUnits: number;
    constructor(name: string, areas: Array<Area>, bonusUnits: number) {
        this.name = name;
        this.areas = areas;
        this.bonusUnits = bonusUnits;
    }

    getName(): string {
        return this.name;
    }

    getAreas(): Array<Area> {
        return this.areas;
    }

    getBonusUnits(): number {
        return this.bonusUnits;
    }
}