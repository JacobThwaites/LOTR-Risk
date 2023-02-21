import { Region } from "../gameLogic/Models/Region";
import { Regions } from "../gameLogic/Enums/Regions";
import { Area } from "../gameLogic/Models/Area";

export function getRegionForArea(area: Area): Region {
    const regions = Object.values(Regions);

    for (let i = 0; i < regions.length; i++) {
        if (regions[i].getAreas().includes(area)) {;
            return regions[i];
        }
    }

    return regions[0];
}