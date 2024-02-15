from game_logic.models.Region import Region

eriador_area_names = [
    "FORLINDON",
    "MITHLOND",
    "HARLINDON",
    "TOWER_HILLS",
    "EVENDIM_HILLS",
    "LUNE_VALLEY",
    "THE_SHIRE"
]

arnor_area_names = [
    "FORODWAITH",
    "ANGMAR",
    "EASTERN_ANGMAR",
    "BORDERLANDS",
    "NORTH_DOWNS",
    "RHUDAUR",
    "FORNOST",
    "WEATHER_HILLS",
    "BUCKLAND",
    "OLD_FOREST",
    "SOUTH_DOWNS"
]

rhun_area_names = [
    "NORTH_RHUN",
    "WITHERED_HEATH",
    "ESGAROTH",
    "SOUTH_RHUN"
]

mirkwood_area_names = [
    "CARROCK",
    "NORTH_MIRKWOOD",
    "ANDUIN_VALLEY",
    "EASTERN_MIRKWOOD",
    "SOUTH_MIRKWOOD"
]

rohan_area_names = [
    "EREGION",
    "MINHIRIATH",
    "DUNLAND",
    "ENEDWAITH",
    "FANGORN",
    "WEST_ROHAN",
    "GAP_OF_ROHAN"
]

rhovanion_area_names = [
    "MORIA",
    "GLADDEN_FIELDS",
    "LORIEN",
    "EMYN_MUIL",
    "BROWNLANDS",
    "RHUN_HILLS",
    "THE_WOLD",
    "DEAD_MARSHES"
]

gondor_area_names = [
    "DRUWAITH_IAUR",
    "ANDRAST",
    "ANFALAS",
    "VALE_OF_ERECH",
    "LAMEDON",
    "BELFALAS",
    "LEBENNIN",
    "MINAS_TIRITH",
    "ITHILIEN",
    "SOUTH_ITHILIEN"
]

mordor_area_names = [
    "UDUN_VALE",
    "MOUNT_DOOM",
    "BARAD_DUR",
    "MINAS_MORGUL",
    "GORGOROTH",
    "NURN"
]

haradwaith_area_names = [
    "HARONDOR",
    "UMBAR",
    "DEEP_HARAD",
    "HARAD",
    "NEAR_HARAD",
    "KHAND"
]

regions = {
    "ERIADOR": Region("ERIADOR", eriador_area_names, 3),
    "ARNOR": Region("ARNOR", arnor_area_names, 7),
    "RHUN": Region("RHUN", rhun_area_names, 2),
    "MIRKWOOD": Region("MIRKWOOD", mirkwood_area_names, 4),
    "ROHAN": Region("ROHAN", rohan_area_names, 4),
    "RHOVANION": Region("RHOVANION", rhovanion_area_names, 4),
    "GONDOR": Region("GONDOR", gondor_area_names, 7),
    "MORDOR": Region("MORDOR", mordor_area_names, 2),
    "HARADWAITH": Region("HARADWAITH", haradwaith_area_names, 2),
}
