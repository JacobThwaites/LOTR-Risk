import { AreaType } from './AreaType';
import { AreaName } from '../Enums/AreaNames';
import { IsSiteOfPower } from './IsSiteOfPower';

export class SiteOfPower extends AreaType {
    constructor(name: AreaName, adjacentAreas: Array<AreaName>) {
        super(name, adjacentAreas)
        this.isSiteOfPower = new IsSiteOfPower();
    }
}