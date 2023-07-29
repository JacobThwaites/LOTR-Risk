import { Region } from "../Models/Region";
import { Regions } from "../Enums/Regions";
import { Area } from "../Models/Area";

export function getRegionForArea(area: Area): Region {
    const areaName = area.getName();
    const regions = Object.values(Regions);

    for (let i = 0; i < regions.length; i++) {
        if (regions[i].getAreaNames().includes(areaName)) {;
            return regions[i];
        }
    }

    return regions[0];
}