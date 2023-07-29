import { AreaName } from './AreaNames';

interface IAdjacencies {
    [key: string]: Array<AreaName>
}

export const Adjacencies: IAdjacencies = {
}

Adjacencies[AreaName.FORLINDON] = [AreaName.MITHLOND];
Adjacencies[AreaName.MITHLOND] = [AreaName.FORLINDON, AreaName.LUNE_VALLEY, AreaName.HARLINDON, AreaName.TOWER_HILLS];
Adjacencies[AreaName.HARLINDON] = [AreaName.MITHLOND];
Adjacencies[AreaName.LUNE_VALLEY] = [AreaName.MITHLOND, AreaName.EVENDIM_HILLS, AreaName.BORDERLANDS, AreaName.TOWER_HILLS];
Adjacencies[AreaName.EVENDIM_HILLS] = [AreaName.LUNE_VALLEY, AreaName.TOWER_HILLS, AreaName.BORDERLANDS, AreaName.NORTH_DOWNS];
Adjacencies[AreaName.TOWER_HILLS] = [AreaName.MITHLOND, AreaName.EVENDIM_HILLS, AreaName.THE_SHIRE, AreaName.LUNE_VALLEY];
Adjacencies[AreaName.THE_SHIRE] = [AreaName.TOWER_HILLS, AreaName.BUCKLAND];
Adjacencies[AreaName.FORODWAITH] = [AreaName.BORDERLANDS, AreaName.ANGMAR, AreaName.EASTERN_ANGMAR, AreaName.NORTH_RHUN, AreaName.WITHERED_HEATH];
Adjacencies[AreaName.BORDERLANDS] = [AreaName.LUNE_VALLEY, AreaName.EVENDIM_HILLS, AreaName.NORTH_DOWNS, AreaName.ANGMAR, AreaName.FORODWAITH, AreaName.WEATHER_HILLS, AreaName.FORNOST];
Adjacencies[AreaName.ANGMAR] = [AreaName.FORODWAITH, AreaName.BORDERLANDS];
Adjacencies[AreaName.NORTH_DOWNS] = [AreaName.BORDERLANDS, AreaName.FORNOST];
Adjacencies[AreaName.FORNOST] = [AreaName.NORTH_DOWNS, AreaName.WEATHER_HILLS, AreaName.OLD_FOREST, AreaName.BUCKLAND, AreaName.BORDERLANDS];
Adjacencies[AreaName.WEATHER_HILLS] = [AreaName.FORNOST, AreaName.BORDERLANDS, AreaName.OLD_FOREST, AreaName.RHUDAUR, AreaName.SOUTH_DOWNS];
Adjacencies[AreaName.EASTERN_ANGMAR] = [AreaName.FORODWAITH, AreaName.CARROCK];
Adjacencies[AreaName.RHUDAUR] = [AreaName.WEATHER_HILLS, AreaName.CARROCK, AreaName.EREGION];
Adjacencies[AreaName.OLD_FOREST] = [AreaName.FORNOST, AreaName.WEATHER_HILLS, AreaName.BUCKLAND, AreaName.SOUTH_DOWNS];
Adjacencies[AreaName.BUCKLAND] = [AreaName.THE_SHIRE, AreaName.FORNOST, AreaName.OLD_FOREST, AreaName.SOUTH_DOWNS];
Adjacencies[AreaName.SOUTH_DOWNS] = [AreaName.BUCKLAND, AreaName.OLD_FOREST, AreaName.MINHIRIATH];
Adjacencies[AreaName.NORTH_RHUN] = [AreaName.FORODWAITH, AreaName.WITHERED_HEATH, AreaName.SOUTH_RHUN];
Adjacencies[AreaName.WITHERED_HEATH] = [AreaName.FORODWAITH, AreaName.NORTH_RHUN, AreaName.ESGAROTH];
Adjacencies[AreaName.ESGAROTH] = [AreaName.WITHERED_HEATH, AreaName.NORTH_MIRKWOOD];
Adjacencies[AreaName.MINHIRIATH] = [AreaName.SOUTH_DOWNS, AreaName.DUNLAND, AreaName.ENEDWAITH];
Adjacencies[AreaName.SOUTH_RHUN] = [AreaName.NORTH_RHUN, AreaName.BROWNLANDS];
Adjacencies[AreaName.CARROCK] = [AreaName.EASTERN_ANGMAR, AreaName.NORTH_MIRKWOOD, AreaName.ANDUIN_VALLEY, AreaName.RHUDAUR];
Adjacencies[AreaName.NORTH_MIRKWOOD] = [AreaName.CARROCK, AreaName.EASTERN_MIRKWOOD, AreaName.ESGAROTH];
Adjacencies[AreaName.ANDUIN_VALLEY] = [AreaName.CARROCK, AreaName.EASTERN_MIRKWOOD, AreaName.SOUTH_MIRKWOOD, AreaName.GLADDEN_FIELDS];
Adjacencies[AreaName.EASTERN_MIRKWOOD] = [AreaName.NORTH_MIRKWOOD, AreaName.ANDUIN_VALLEY, AreaName.SOUTH_MIRKWOOD, AreaName.BROWNLANDS];
Adjacencies[AreaName.SOUTH_MIRKWOOD] = [AreaName.ANDUIN_VALLEY, AreaName.EASTERN_MIRKWOOD, AreaName.BROWNLANDS, AreaName.EMYN_MUIL, AreaName.BROWNLANDS];
Adjacencies[AreaName.EREGION] = [AreaName.RHUDAUR, AreaName.MORIA, AreaName.DUNLAND];
Adjacencies[AreaName.DUNLAND] = [AreaName.EREGION, AreaName.MINHIRIATH, AreaName.ENEDWAITH];
Adjacencies[AreaName.ENEDWAITH] = [AreaName.MINHIRIATH, AreaName.DUNLAND, AreaName.GAP_OF_ROHAN];
Adjacencies[AreaName.WEST_ROHAN] = [AreaName.GAP_OF_ROHAN, AreaName.DRUWAITH_IAUR];
Adjacencies[AreaName.GAP_OF_ROHAN] = [AreaName.ENEDWAITH, AreaName.WEST_ROHAN, AreaName.FANGORN, AreaName.THE_WOLD, AreaName.MINAS_TIRITH];
Adjacencies[AreaName.FANGORN] = [AreaName.LORIEN, AreaName.THE_WOLD, AreaName.GAP_OF_ROHAN];
Adjacencies[AreaName.MORIA] = [AreaName.EREGION, AreaName.GLADDEN_FIELDS];
Adjacencies[AreaName.GLADDEN_FIELDS] = [AreaName.MORIA, AreaName.ANDUIN_VALLEY, AreaName.LORIEN];
Adjacencies[AreaName.LORIEN] = [AreaName.GLADDEN_FIELDS, AreaName.FANGORN, AreaName.THE_WOLD];
Adjacencies[AreaName.THE_WOLD] = [AreaName.LORIEN, AreaName.FANGORN, AreaName.EMYN_MUIL, AreaName.GAP_OF_ROHAN];
Adjacencies[AreaName.EMYN_MUIL] = [AreaName.ANDUIN_VALLEY, AreaName.SOUTH_MIRKWOOD, AreaName.BROWNLANDS, AreaName.DEAD_MARSHES, AreaName.THE_WOLD];
Adjacencies[AreaName.BROWNLANDS] = [AreaName.SOUTH_MIRKWOOD, AreaName.SOUTH_RHUN, AreaName.EMYN_MUIL, AreaName.RHUN_HILLS, AreaName.DEAD_MARSHES];
Adjacencies[AreaName.RHUN_HILLS] = [AreaName.BROWNLANDS];
Adjacencies[AreaName.DEAD_MARSHES] = [AreaName.EMYN_MUIL, AreaName.BROWNLANDS, AreaName.UDUN_VALE, AreaName.ITHILIEN];
Adjacencies[AreaName.DRUWAITH_IAUR] = [AreaName.WEST_ROHAN, AreaName.ANFALAS];
Adjacencies[AreaName.ANDRAST] = [AreaName.ANFALAS];
Adjacencies[AreaName.ANFALAS] = [AreaName.ANDRAST, AreaName.DRUWAITH_IAUR, AreaName.VALE_OF_ERECH];
Adjacencies[AreaName.VALE_OF_ERECH] = [AreaName.ANFALAS, AreaName.LAMEDON];
Adjacencies[AreaName.LAMEDON] = [AreaName.VALE_OF_ERECH, AreaName.BELFALAS, AreaName.LEBENNIN];
Adjacencies[AreaName.BELFALAS] = [AreaName.LAMEDON, AreaName.LEBENNIN];
Adjacencies[AreaName.LEBENNIN] = [AreaName.LAMEDON, AreaName.BELFALAS, AreaName.MINAS_TIRITH];
Adjacencies[AreaName.MINAS_TIRITH] = [AreaName.GAP_OF_ROHAN, AreaName.LEBENNIN, AreaName.ITHILIEN];
Adjacencies[AreaName.ITHILIEN] = [AreaName.DEAD_MARSHES, AreaName.SOUTH_ITHILIEN, AreaName.MINAS_MORGUL, AreaName.MINAS_TIRITH];
Adjacencies[AreaName.SOUTH_ITHILIEN] = [AreaName.ITHILIEN, AreaName.HARONDOR];
Adjacencies[AreaName.UDUN_VALE] = [AreaName.DEAD_MARSHES, AreaName.MOUNT_DOOM];
Adjacencies[AreaName.MOUNT_DOOM] = [AreaName.UDUN_VALE, AreaName.BARAD_DUR, AreaName.GORGOROTH];
Adjacencies[AreaName.BARAD_DUR] = [AreaName.MOUNT_DOOM, AreaName.GORGOROTH];
Adjacencies[AreaName.MINAS_MORGUL] = [AreaName.GORGOROTH, AreaName.ITHILIEN];
Adjacencies[AreaName.GORGOROTH] = [AreaName.MOUNT_DOOM, AreaName.BARAD_DUR, AreaName.MINAS_MORGUL, AreaName.NURN];
Adjacencies[AreaName.NURN] = [AreaName.GORGOROTH];
Adjacencies[AreaName.HARONDOR] = [AreaName.SOUTH_ITHILIEN, AreaName.HARAD];
Adjacencies[AreaName.UMBAR] = [AreaName.DEEP_HARAD];
Adjacencies[AreaName.DEEP_HARAD] = [AreaName.UMBAR, AreaName.HARAD];
Adjacencies[AreaName.HARAD] = [AreaName.DEEP_HARAD, AreaName.HARONDOR, AreaName.NEAR_HARAD];
Adjacencies[AreaName.NEAR_HARAD] = [AreaName.HARAD, AreaName.KHAND];
Adjacencies[AreaName.KHAND] = [AreaName.NEAR_HARAD];