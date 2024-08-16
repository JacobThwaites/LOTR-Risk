adjacencies = {}

adjacencies["FORLINDON"] = ["MITHLOND"]
adjacencies["MITHLOND"] = ["FORLINDON", "LUNE_VALLEY", "HARLINDON", "TOWER_HILLS"]
adjacencies["HARLINDON"] = ["MITHLOND"]
adjacencies["LUNE_VALLEY"] = ["MITHLOND", "EVENDIM_HILLS", "BORDERLANDS", "TOWER_HILLS"]
adjacencies["TOWER_HILLS"] = ["MITHLOND", "EVENDIM_HILLS", "THE_SHIRE", "LUNE_VALLEY"]
adjacencies["THE_SHIRE"] = ["TOWER_HILLS", "BUCKLAND"]
adjacencies["FORODWAITH"] = ["BORDERLANDS", "ANGMAR", "EASTERN_ANGMAR", "NORTH_RHUN", "WITHERED_HEATH"]
adjacencies["BORDERLANDS"] = ["LUNE_VALLEY", "EVENDIM_HILLS", "NORTH_DOWNS", "ANGMAR", "FORODWAITH", "WEATHER_HILLS", "FORNOST"]
adjacencies["ANGMAR"] = ["FORODWAITH", "BORDERLANDS"]
adjacencies["NORTH_DOWNS"] = ["BORDERLANDS", "FORNOST"]
adjacencies["FORNOST"] = ["NORTH_DOWNS", "WEATHER_HILLS", "OLD_FOREST", "BUCKLAND", "BORDERLANDS"]
adjacencies["WEATHER_HILLS"] = ["FORNOST", "BORDERLANDS", "OLD_FOREST", "RHUDAUR", "SOUTH_DOWNS"]
adjacencies["EASTERN_ANGMAR"] = ["FORODWAITH", "CARROCK"]
adjacencies["RHUDAUR"] = ["WEATHER_HILLS", "CARROCK", "EREGION"]
adjacencies["OLD_FOREST"] = ["FORNOST", "WEATHER_HILLS", "BUCKLAND", "SOUTH_DOWNS"]
adjacencies["BUCKLAND"] = ["THE_SHIRE", "FORNOST", "OLD_FOREST", "SOUTH_DOWNS"]
adjacencies["SOUTH_DOWNS"] = ["BUCKLAND", "OLD_FOREST", "MINHIRIATH"]
adjacencies["NORTH_RHUN"] = ["FORODWAITH", "WITHERED_HEATH", "SOUTH_RHUN"]
adjacencies["WITHERED_HEATH"] = ["FORODWAITH", "NORTH_RHUN", "ESGAROTH"]
adjacencies["ESGAROTH"] = ["WITHERED_HEATH", "NORTH_MIRKWOOD"]
adjacencies["MINHIRIATH"] = ["SOUTH_DOWNS", "DUNLAND", "ENEDWAITH"]
adjacencies["SOUTH_RHUN"] = ["NORTH_RHUN", "BROWNLANDS"]
adjacencies["CARROCK"] = ["EASTERN_ANGMAR", "NORTH_MIRKWOOD", "ANDUIN_VALLEY", "RHUDAUR"]
adjacencies["NORTH_MIRKWOOD"] = ["CARROCK", "EASTERN_MIRKWOOD", "ESGAROTH"]
adjacencies["ANDUIN_VALLEY"] = ["CARROCK", "EASTERN_MIRKWOOD", "SOUTH_MIRKWOOD", "GLADDEN_FIELDS"]
adjacencies["EASTERN_MIRKWOOD"] = ["NORTH_MIRKWOOD", "ANDUIN_VALLEY", "SOUTH_MIRKWOOD", "BROWNLANDS"]
adjacencies["SOUTH_MIRKWOOD"] = ["ANDUIN_VALLEY", "EASTERN_MIRKWOOD", "BROWNLANDS", "EMYN_MUIL", "BROWNLANDS"]
adjacencies["EREGION"] = ["RHUDAUR", "MORIA", "DUNLAND"]
adjacencies["DUNLAND"] = ["EREGION", "MINHIRIATH", "ENEDWAITH"]
adjacencies["ENEDWAITH"] = ["MINHIRIATH", "DUNLAND", "GAP_OF_ROHAN"]
adjacencies["WEST_ROHAN"] = ["GAP_OF_ROHAN", "DRUWAITH_IAUR"]
adjacencies["GAP_OF_ROHAN"] = ["ENEDWAITH", "WEST_ROHAN", "FANGORN", "THE_WOLD", "MINAS_TIRITH"]
adjacencies["FANGORN"] = ["LORIEN", "THE_WOLD", "GAP_OF_ROHAN"]
adjacencies["MORIA", "EREGION", "GLADDEN_FIELDS"]
adjacencies["GLADDEN_FIELDS"] = ["MORIA", "ANDUIN_VALLEY", "LORIEN"]
adjacencies["LORIEN"] = ["GLADDEN_FIELDS", "FANGORN", "THE_WOLD"]
adjacencies["THE_WOLD"] = ["LORIEN", "FANGORN", "EMYN_MUIL", "GAP_OF_ROHAN"]
adjacencies["EMYN_MUIL"] = ["ANDUIN_VALLEY", "SOUTH_MIRKWOOD", "BROWNLANDS", "DEAD_MARSHES", "THE_WOLD"]
adjacencies["BROWNLANDS"] = ["SOUTH_MIRKWOOD", "SOUTH_RHUN", "EMYN_MUIL", "RHUN_HILLS", "DEAD_MARSHES"]
adjacencies["RHUN_HILLS"] = ["BROWNLANDS"]
adjacencies["DEAD_MARSHES"] = ["EMYN_MUIL", "BROWNLANDS", "UDUN_VALE", "ITHILIEN"]
adjacencies["DRUWAITH_IAUR"] = ["WEST_ROHAN", "ANFALAS"]
adjacencies["ANDRAST"] = ["ANFALAS"]
adjacencies["ANFALAS"] = ["ANDRAST", "DRUWAITH_IAUR", "VALE_OF_ERECH"]
adjacencies["VALE_OF_ERECH"] = ["ANFALAS", "LAMEDON"]
adjacencies["LAMEDON"] = ["VALE_OF_ERECH", "BELFALAS", "LEBENNIN"]
adjacencies["BELFALAS"] = ["LAMEDON", "LEBENNIN"]
adjacencies["LEBENNIN"] = ["LAMEDON", "BELFALAS", "MINAS_TIRITH"]
adjacencies["MINAS_TIRITH"] = ["GAP_OF_ROHAN", "LEBENNIN", "ITHILIEN"]
adjacencies["ITHILIEN"] = ["DEAD_MARSHES", "SOUTH_ITHILIEN", "MINAS_MORGUL", "MINAS_TIRITH"]
adjacencies["SOUTH_ITHILIEN"] = ["ITHILIEN", "HARONDOR"]
adjacencies["UDUN_VALE"] = ["DEAD_MARSHES", "MOUNT_DOOM"]
adjacencies["MOUNT_DOOM"] = ["UDUN_VALE", "BARAD_DUR", "GORGOROTH"]
adjacencies["BARAD_DUR"] = ["MOUNT_DOOM", "GORGOROTH"]
adjacencies["MINAS_MORGUL"] = ["GORGOROTH", "ITHILIEN"]
adjacencies["GORGOROTH"] = ["MOUNT_DOOM", "BARAD_DUR", "MINAS_MORGUL", "NURN"]
adjacencies["NURN"] = ["GORGOROTH"]
adjacencies["HARONDOR"] = ["SOUTH_ITHILIEN", "HARAD"]
adjacencies["UMBAR"] = ["DEEP_HARAD"]
adjacencies["DEEP_HARAD"] = ["UMBAR", "HARAD"]
adjacencies["HARAD"] = ["DEEP_HARAD", "HARONDOR", "NEAR_HARAD"]
adjacencies["NEAR_HARAD"] = ["HARAD", "KHAND"]
adjacencies["KHAND"] = ["NEAR_HARAD"]