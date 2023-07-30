import { AreaType } from "../Models/AreaType";
import { GameAreas } from "./types";

const convertAreasArrayToHashmap = (areaLists: Array<AreaType[]>): GameAreas => {
    const areaHashmap: GameAreas = {};

    for (const areaList of areaLists) {
        for (const area of areaList) {
            areaHashmap[area.getName()] = area;
        }
    }

    return areaHashmap;
};

export default convertAreasArrayToHashmap;