import { Region } from '../Models/Region';
import { Areas } from './Areas';

const eriadorAreas = [Areas.FORLINDON, Areas.MITHLOND, Areas.HARLINDON, Areas.TOWER_HILLS, Areas.EVENDIM_HILLS, Areas.LUNE_VALLEY, Areas.THE_SHIRE];
const arnorAreas = [Areas.FORODWAITH, Areas.ANGMAR, Areas.EASTERN_ANGMAR, Areas.BORDERLANDS, Areas.NORTH_DOWNS, Areas.RHUDAUR, Areas.FORNOST, Areas.WEATHER_HILLS, Areas.BUCKLAND, Areas.OLD_FOREST, Areas.SOUTH_DOWNS];
const rhunAreas = [Areas.NORTH_RHUN, Areas.WITHERED_HEATH, Areas.ESGAROTH, Areas.SOUTH_RHUN];
const mirkwoodAreas = [Areas.CARROCK, Areas.NORTH_MIRKWOOD, Areas.ANDUIN_VALLEY, Areas.EASTERN_MIRKWOOD, Areas.SOUTH_MIRKWOOD];
const rohanAreas = [Areas.EREGION, Areas.MINHIRIATH, Areas.DUNLAND, Areas.ENEDWAITH, Areas.FANGORN, Areas.WEST_ROHAN, Areas.GAP_OF_ROHAN];
const rhovanionAreas = [Areas.MORIA, Areas.GLADDEN_FIELDS, Areas.LORIEN, Areas.EMYN_MUIL, Areas.BROWNLANDS, Areas.RHUN_HILLS, Areas.THE_WOLD, Areas.DEAD_MARSHES];
const gondorAreas = [Areas.DRUWAITH_IAUR, Areas.ANDRAST, Areas.ANFALAS, Areas.VALE_OF_ERECH, Areas.LAMEDON, Areas.BELFALAS, Areas.LEBENNIN, Areas.MINAS_TIRITH, Areas.ITHILIEN, Areas.SOUTH_ITHILIEN];
const mordorAreas = [Areas.UDUN_VALE, Areas.MOUNT_DOOM, Areas.BARAD_DUR, Areas.MINAS_MORGUL, Areas.GORGOROTH, Areas.NURN];
const haradwaithAreas = [Areas.HARONDOR, Areas.UMBAR, Areas.DEEP_HARAD, Areas.HARAD, Areas.NEAR_HARAD, Areas.KHAND];

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