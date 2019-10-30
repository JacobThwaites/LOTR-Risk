import { Region } from './Region';

export class Board {
    private regions: Array<Region>;
    constructor(regions: Array<Region>) {
        this.regions = regions;
    }

    getRegions(): Array<Region> {
        return this.regions;
    }
}