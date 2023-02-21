import { Area } from "../gameLogic/Models/Area";
import { Adjacencies } from '../gameLogic/Enums/AreaAdjacencies';

export function areAreasConnected(area1: Area, area2: Area): boolean {
    if (!area1) {
        return false;
    }
    const areaName = area1.getName();
    return Adjacencies[areaName].includes(area2);
}