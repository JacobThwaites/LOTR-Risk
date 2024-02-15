from game_logic.models.Area import Area
from game_logic.models.Region import Region
from game_logic.enums.regions import regions

def get_region_for_area(area: Area) -> Region:
    for region in regions.values():
        if area.name in region.area_names:
            return region
