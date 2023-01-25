import { Area } from "../logic/Models/Area";
import { AreaType } from "../logic/Models/AreaType";


export function convertPlayerAreasToString(areas: Array<AreaType[]>): Array<string | null> {
    const parsedAreas: Array<string | null> = [null, null, null, null];
    for (let i = 0; i < areas.length; i++) {
        let areasString = '';

        for (let j = 0; j < areas[i].length - 1; j++) {
            areasString += `${areas[i][j].getName()}, `;
        }

        areasString += `${areas[i][areas[i].length - 1].getName()}`;
        parsedAreas[i] = (areasString);
    }

    return parsedAreas;
}

export function getAreasByNames(areasString: Array<string>): Array<Area> {
    const areas: Array<Area> = [];

// TODO: implement logic

    return areas;
}