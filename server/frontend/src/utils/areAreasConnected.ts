import { Adjacencies } from '../gameLogic/Enums/AreaAdjacencies';
import { AreaName } from "../gameLogic/Enums/AreaNames";

export function areAreasConnected(area1: AreaName, area2: AreaName): boolean {
    if (!area1) {
        return false;
    }
    return Adjacencies[area1].includes(area2);
}