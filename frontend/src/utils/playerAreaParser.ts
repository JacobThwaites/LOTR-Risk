import { Areas } from "../gameLogic/Enums/Areas";
import { Area } from "../gameLogic/Models/Area";
import { AreaType } from "../gameLogic/Models/AreaType";

export function getAreas(areaNames: Array<string>) {
    const playerAreas: Array<Array<AreaType>> = [];

    for (let i = 0; i < areaNames.length; i++) {
        const names = areaNames[i].split(', ');
        const areas = getAreasByNames(names);
        playerAreas.push(areas);
    }

    return playerAreas;
}

function getAreasByNames(areaNames: Array<string>): Array<Area> {
    const areas: Array<Area> = [];
    for (let i = 0; i < areaNames.length; i++) {
        const area: AreaType = Areas[areaNames[i]];
        areas.push(area);
    }

    return areas;
}
