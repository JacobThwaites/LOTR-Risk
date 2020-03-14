import { AreaType } from '../Models/AreaType';

export class UnitManeuverController {
    private origin: AreaType;
    private destination: AreaType;
    constructor(origin: AreaType, destination: AreaType) {
        this.origin = origin;
        this.destination = destination;
    }

    handleManeuver(units: number): boolean {
        if (this.isManeuverValid(units)) {
            this.moveUnits(units);
            return true;
        }

        return false;
    }

    isManeuverValid(units: number) {
        return units < this.origin.getUnits() && units > 0;
    }

    moveUnits(units: number) {
        this.origin.removeUnits(units);
        this.destination.addUnits(units);
    }
}