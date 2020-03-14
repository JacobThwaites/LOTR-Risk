import { AreaName } from '../Enums/AreaNames';
import { AreaType } from './AreaType';
import { HasDefendingBonus } from './HasDefendingBonus';

export class Stronghold extends AreaType {
    constructor(name: AreaName, adjacentAreas: Array<AreaName>) {
        super(name, adjacentAreas);
        this.defendingBonus = new HasDefendingBonus();
    }
}