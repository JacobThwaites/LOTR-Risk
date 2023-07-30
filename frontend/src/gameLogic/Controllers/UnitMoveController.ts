import areaDetails from '../../components/svgPaths/AreaDetails';
import { AreaName } from '../Enums/AreaNames';

export class UnitMoveController {
    private origin: AreaName;
    private destination: AreaName;
    constructor(origin: AreaName, destination: AreaName) {
        this.origin = origin;
        this.destination = destination;
    }

    static isMoveValid(origin: AreaName, units: number) {
        const areaDetail = areaDetails[origin];
        return units < areaDetail.units && units > 0;
    }

    moveUnits(units: number) {
        const origin = areaDetails[this.origin];
        const destination = areaDetails[this.destination];
        origin.units -= units;
        destination.units += units;
    }
}