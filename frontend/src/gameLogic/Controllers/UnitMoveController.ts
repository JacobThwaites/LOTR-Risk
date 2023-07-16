import { AreaType } from '../Models/AreaType';

export class UnitMoveController {
    private origin: AreaType;
    private destination: AreaType;
    constructor(origin: AreaType, destination: AreaType) {
        this.origin = origin;
        this.destination = destination;
    }

    static isMoveValid(origin: AreaType, units: number) {
        return units < origin.getUnits() && units > 0;
    }

    moveUnits(units: number) {
        this.origin.removeUnits(units);
        this.destination.addUnits(units);
    }
}