import { Region } from '../Models/Region';
import { AreaName } from './AreaNames';

const eriadorAreas = [AreaName.FORLINDON, AreaName.MITHLOND, AreaName.HARLINDON, AreaName.TOWER_HILLS, AreaName.EVENDIM_HILLS, AreaName.LUNE_VALLEY, AreaName.THE_SHIRE];
const arnorAreas = [AreaName.FORODWAITH, AreaName.ANGMAR, AreaName.EASTERN_ANGMAR, AreaName.BORDERLANDS, AreaName.NORTH_DOWNS, AreaName.RHUDAUR, AreaName.FORNOST, AreaName.WEATHER_HILLS, AreaName.BUCKLAND, AreaName.OLD_FOREST, AreaName.SOUTH_DOWNS];
const rhunAreas = [AreaName.NORTH_RHUN, AreaName.WITHERED_HEATH, AreaName.ESGAROTH, AreaName.SOUTH_RHUN];
const mirkwoodAreas = [AreaName.CARROCK, AreaName.NORTH_MIRKWOOD, AreaName.ANDUIN_VALLEY, AreaName.EASTERN_MIRKWOOD, AreaName.SOUTH_MIRKWOOD];
const rohanAreas = [AreaName.EREGION, AreaName.MINHIRIATH, AreaName.DUNLAND, AreaName.ENEDWAITH, AreaName.FANGORN, AreaName.WEST_ROHAN, AreaName.GAP_OF_ROHAN];
const rhovanionAreas = [AreaName.MORIA, AreaName.GLADDEN_FIELDS, AreaName.LORIEN, AreaName.EMYN_MUIL, AreaName.BROWNLANDS, AreaName.RHUN_HILLS, AreaName.THE_WOLD, AreaName.DEAD_MARSHES];
const gondorAreas = [AreaName.DRUWAITH_IAUR, AreaName.ANDRAST, AreaName.ANFALAS, AreaName.VALE_OF_ERECH, AreaName.LAMEDON, AreaName.BELFALAS, AreaName.LEBENNIN, AreaName.MINAS_TIRITH, AreaName.ITHILIEN, AreaName.SOUTH_ITHILIEN];
const mordorAreas = [AreaName.UDUN_VALE, AreaName.MOUNT_DOOM, AreaName.BARAD_DUR, AreaName.MINAS_MORGUL, AreaName.GORGOROTH, AreaName.NURN];
const haradwaithAreas = [AreaName.HARONDOR, AreaName.UMBAR, AreaName.DEEP_HARAD, AreaName.HARAD, AreaName.NEAR_HARAD, AreaName.KHAND];

interface ListOfRegions { 
    [key: string]: Region
}

export const Regions: ListOfRegions = {
    ERIADOR: new Region('eriador', eriadorAreas, 3),
    ARNOR: new Region('arnor', arnorAreas, 7),
    RHUN: new Region('rhun', rhunAreas, 2),
    MIRKWOOD: new Region('mirkwood', mirkwoodAreas, 4),
    ROHAN: new Region('rohan', rohanAreas, 4),
    ROHVANION: new Region('rhovanion', rhovanionAreas, 4),
    GONDOR: new Region('gondor', gondorAreas, 7),
    MORDOR: new Region('mordor', mordorAreas, 2),
    HARADWAITH: new Region('haradwaith', haradwaithAreas, 2),
}