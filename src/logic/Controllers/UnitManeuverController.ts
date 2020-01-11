import { Area } from '../Models/Area';

export class UnitManeuverController {
    private origin: Area;
    private destination: Area;
    constructor(origin: Area, destination: Area) {
        this.origin = origin;
        this.destination = destination;
    }

    handleManeuver(units: number) {
        if (this.isManeuverValid(units)) {
            this.moveUnits(units);
        }
    }

    isManeuverValid(units: number) {
        return units < this.origin.getUnits();
    }

    moveUnits(units: number) {
        this.origin.removeUnits(units);
        this.destination.addUnits(units);
    }
}