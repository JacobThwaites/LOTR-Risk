import { Areas } from './Areas';
import { AreaName } from './AreaNames';
import { AreaType } from '../Models/AreaType';

interface Adjacencies {
    [key: string]: Array<AreaType>
}

export const Adjacencies: Adjacencies = {
}

Adjacencies[AreaName.FORLINDON] = [Areas.MITHLOND];
Adjacencies[AreaName.MITHLOND] = [Areas.FORLINDON, Areas.LUNE_VALLEY, Areas.HARLINDON, Areas.TOWER_HILLS];
Adjacencies[AreaName.HARLINDON] = [Areas.MITHLOND];
Adjacencies[AreaName.LUNE_VALLEY] = [Areas.MITHLOND, Areas.EVENDIM_HILLS, Areas.BORDERLANDS, Areas.TOWER_HILLS];
Adjacencies[AreaName.EVENDIM_HILLS] = [Areas.LUNE_VALLEY, Areas.TOWER_HILLS, Areas.BORDERLANDS, Areas.NORTH_DOWNS];
Adjacencies[AreaName.TOWER_HILLS] = [Areas.MITHLOND, Areas.EVENDIM_HILLS, Areas.THE_SHIRE, Areas.LUNE_VALLEY];
Adjacencies[AreaName.THE_SHIRE] = [Areas.TOWER_HILLS, Areas.BUCKLAND];
Adjacencies[AreaName.FORODWAITH] = [Areas.BORDERLANDS, Areas.ANGMAR, Areas.EASTERN_ANGMAR, Areas.NORTH_RHUN, Areas.WITHERED_HEATH];
Adjacencies[AreaName.BORDERLANDS] = [Areas.LUNE_VALLEY, Areas.EVENDIM_HILLS, Areas.NORTH_DOWNS, Areas.ANGMAR, Areas.FORODWAITH, Areas.WEATHER_HILLS, Areas.FORNOST];
Adjacencies[AreaName.ANGMAR] = [Areas.FORODWAITH, Areas.BORDERLANDS];
Adjacencies[AreaName.NORTH_DOWNS] = [Areas.BORDERLANDS, Areas.FORNOST];
Adjacencies[AreaName.FORNOST] = [Areas.NORTH_DOWNS, Areas.WEATHER_HILLS, Areas.OLD_FOREST, Areas.BUCKLAND, Areas.BORDERLANDS];
Adjacencies[AreaName.WEATHER_HILLS] = [Areas.FORNOST, Areas.BORDERLANDS, Areas.OLD_FOREST, Areas.RHUDAUR, Areas.SOUTH_DOWNS];
Adjacencies[AreaName.EASTERN_ANGMAR] = [Areas.FORODWAITH, Areas.CARROCK];
Adjacencies[AreaName.RHUDAUR] = [Areas.WEATHER_HILLS, Areas.CARROCK, Areas.EREGION];
Adjacencies[AreaName.OLD_FOREST] = [Areas.FORNOST, Areas.WEATHER_HILLS, Areas.BUCKLAND, Areas.SOUTH_DOWNS];
Adjacencies[AreaName.BUCKLAND] = [Areas.THE_SHIRE, Areas.FORNOST, Areas.OLD_FOREST, Areas.SOUTH_DOWNS];
Adjacencies[AreaName.SOUTH_DOWNS] = [Areas.BUCKLAND, Areas.OLD_FOREST, Areas.MINHIRIATH];
Adjacencies[AreaName.NORTH_RHUN] = [Areas.FORODWAITH, Areas.WITHERED_HEATH, Areas.SOUTH_RHUN];
Adjacencies[AreaName.WITHERED_HEATH] = [Areas.FORODWAITH, Areas.NORTH_RHUN, Areas.ESGAROTH];
Adjacencies[AreaName.ESGAROTH] = [Areas.WITHERED_HEATH, Areas.NORTH_MIRKWOOD];
Adjacencies[AreaName.MINHIRIATH] = [Areas.SOUTH_DOWNS, Areas.DUNLAND, Areas.ENEDWAITH];
Adjacencies[AreaName.SOUTH_RHUN] = [Areas.NORTH_RHUN, Areas.BROWNLANDS];
Adjacencies[AreaName.CARROCK] = [Areas.EASTERN_ANGMAR, Areas.NORTH_MIRKWOOD, Areas.ANDUIN_VALLEY, Areas.RHUDAUR];
Adjacencies[AreaName.NORTH_MIRKWOOD] = [Areas.CARROCK, Areas.EASTERN_MIRKWOOD, Areas.ESGAROTH];
Adjacencies[AreaName.ANDUIN_VALLEY] = [Areas.CARROCK, Areas.EASTERN_MIRKWOOD, Areas.SOUTH_MIRKWOOD, Areas.GLADDEN_FIELDS];
Adjacencies[AreaName.EASTERN_MIRKWOOD] = [Areas.NORTH_MIRKWOOD, Areas.ANDUIN_VALLEY, Areas.SOUTH_MIRKWOOD, Areas.BROWNLANDS];
Adjacencies[AreaName.SOUTH_MIRKWOOD] = [Areas.ANDUIN_VALLEY, Areas.EASTERN_MIRKWOOD, Areas.BROWNLANDS, Areas.EMYN_MUIL, Areas.BROWNLANDS];
Adjacencies[AreaName.EREGION] = [Areas.RHUDAUR, Areas.MORIA, Areas.DUNLAND];
Adjacencies[AreaName.DUNLAND] = [Areas.EREGION, Areas.MINHIRIATH, Areas.ENEDWAITH];
Adjacencies[AreaName.ENEDWAITH] = [Areas.MINHIRIATH, Areas.DUNLAND, Areas.GAP_OF_ROHAN];
Adjacencies[AreaName.WEST_ROHAN] = [Areas.GAP_OF_ROHAN, Areas.DRUWAITH_IAUR];
Adjacencies[AreaName.GAP_OF_ROHAN] = [Areas.ENEDWAITH, Areas.WEST_ROHAN, Areas.FANGORN, Areas.THE_WOLD, Areas.MINAS_TIRITH];
Adjacencies[AreaName.FANGORN] = [Areas.LORIEN, Areas.THE_WOLD, Areas.GAP_OF_ROHAN];
Adjacencies[AreaName.MORIA] = [Areas.EREGION, Areas.GLADDEN_FIELDS];
Adjacencies[AreaName.GLADDEN_FIELDS] = [Areas.MORIA, Areas.ANDUIN_VALLEY, Areas.LORIEN];
Adjacencies[AreaName.LORIEN] = [Areas.GLADDEN_FIELDS, Areas.FANGORN, Areas.THE_WOLD];
Adjacencies[AreaName.THE_WOLD] = [Areas.LORIEN, Areas.FANGORN, Areas.EMYN_MUIL, Areas.GAP_OF_ROHAN];
Adjacencies[AreaName.EMYN_MUIL] = [Areas.ANDUIN_VALLEY, Areas.SOUTH_MIRKWOOD, Areas.BROWNLANDS, Areas.DEAD_MARSHES, Areas.THE_WOLD];
Adjacencies[AreaName.BROWNLANDS] = [Areas.SOUTH_MIRKWOOD, Areas.SOUTH_RHUN, Areas.EMYN_MUIL, Areas.RHUN_HILLS, Areas.DEAD_MARSHES];
Adjacencies[AreaName.RHUN_HILLS] = [Areas.BROWNLANDS];
Adjacencies[AreaName.DEAD_MARSHES] = [Areas.EMYN_MUIL, Areas.BROWNLANDS, Areas.UDUN_VALE, Areas.ITHILIEN];
Adjacencies[AreaName.DRUWAITH_IAUR] = [Areas.WEST_ROHAN, Areas.ANFALAS];
Adjacencies[AreaName.ANDRAST] = [Areas.ANFALAS];
Adjacencies[AreaName.ANFALAS] = [Areas.ANDRAST, Areas.DRUWAITH_IAUR, Areas.VALE_OF_ERECH];
Adjacencies[AreaName.VALE_OF_ERECH] = [Areas.ANFALAS, Areas.LAMEDON];
Adjacencies[AreaName.LAMEDON] = [Areas.VALE_OF_ERECH, Areas.BELFALAS, Areas.LEBENNIN];
Adjacencies[AreaName.BELFALAS] = [Areas.LAMEDON, Areas.LEBENNIN];
Adjacencies[AreaName.LEBENNIN] = [Areas.LAMEDON, Areas.BELFALAS, Areas.MINAS_TIRITH];
Adjacencies[AreaName.MINAS_TIRITH] = [Areas.GAP_OF_ROHAN, Areas.LEBENNIN, Areas.ITHILIEN];
Adjacencies[AreaName.ITHILIEN] = [Areas.DEAD_MARSHES, Areas.SOUTH_ITHILIEN, Areas.MINAS_MORGUL, Areas.MINAS_TIRITH];
Adjacencies[AreaName.SOUTH_ITHILIEN] = [Areas.ITHILIEN, Areas.HARONDOR];
Adjacencies[AreaName.UDUN_VALE] = [Areas.DEAD_MARSHES, Areas.MOUNT_DOOM];
Adjacencies[AreaName.MOUNT_DOOM] = [Areas.UDUN_VALE, Areas.BARAD_DUR, Areas.GORGOROTH];
Adjacencies[AreaName.BARAD_DUR] = [Areas.MOUNT_DOOM, Areas.GORGOROTH];
Adjacencies[AreaName.MINAS_MORGUL] = [Areas.GORGOROTH, Areas.ITHILIEN];
Adjacencies[AreaName.GORGOROTH] = [Areas.MOUNT_DOOM, Areas.BARAD_DUR, Areas.MINAS_MORGUL, Areas.NURN];
Adjacencies[AreaName.NURN] = [Areas.GORGOROTH];
Adjacencies[AreaName.HARONDOR] = [Areas.SOUTH_ITHILIEN, Areas.HARAD];
Adjacencies[AreaName.UMBAR] = [Areas.DEEP_HARAD];
Adjacencies[AreaName.DEEP_HARAD] = [Areas.UMBAR, Areas.HARAD];
Adjacencies[AreaName.HARAD] = [Areas.DEEP_HARAD, Areas.HARONDOR, Areas.NEAR_HARAD];
Adjacencies[AreaName.NEAR_HARAD] = [Areas.HARAD, Areas.KHAND];
Adjacencies[AreaName.KHAND] = [Areas.NEAR_HARAD];