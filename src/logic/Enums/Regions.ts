import { Region } from '../Models/Region';
import { Area } from '../Models/Area';
import { AreaName } from './AreaNames';

// TODO: update to use correct list of areas 
const areas = [new Area(AreaName.Borderlands, false, false, [AreaName.Borderlands])];

export const Regions = [
    new Region('eriador', areas, 3),
    new Region('arnor', areas, 7),
    new Region('rhun', areas, 2),
    new Region('mirkwood', areas, 4),
    new Region('rohan', areas, 4),
    new Region('rhovanion', areas, 4),
    new Region('gondor', areas, 7),
    new Region('mordor', areas, 2),
    new Region('haradwaith', areas, 2),
]