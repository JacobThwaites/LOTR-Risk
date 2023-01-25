import { Region } from "../logic/Models/Region";
import { Regions } from "../logic/Enums/Regions";
import { Area } from "../logic/Models/Area";

export function getRegionForArea(area: Area): Region {
    const regions = Object.values(Regions);

    for (let i = 0; i < regions.length; i++) {
        if (regions[i].getAreas().includes(area)) {;
            return regions[i];
        }
    }

    return regions[0];
}