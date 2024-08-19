from game_logic.models.Area import Area
from game_logic.models.Region import Region
from game_logic.utils import get_region_for_area
import math

class Player():
    def __init__(self, colour: str):
        self.user_id = ""
        self.units = 0
        self.colour = colour
        self.reinforcements = 0
        self.areas = []
        self.regions = []
        self.territory_cards = []
        
    def add_area(self, area: Area):
        self.areas.append(area)
        area_region = get_region_for_area(area)
        if self.has_all_areas_for_region(area_region):
            self.regions.append(area_region)
            
    def add_reinforcements(self, reinforcements: int):
        self.reinforcements += reinforcements
        self.units += reinforcements
    
    def has_all_areas_for_region(self, region: Region) -> bool:
        for area_name in region.area_names:
            if not self.is_area_name_in_areas(area_name):
                return False 
        
        return True
        
    def is_area_name_in_areas(self, area_name: str) -> bool:
        return area_name in [area.name for area in self.areas]
    
    def remove_area(self, area: Area):
        self.areas = [a for a in self.areas if a.name != area.name]
        
        area_region = get_region_for_area(area)
        if area_region in self.regions:
            self.regions = [r for r in self.regions if r and r.name != area_region.name]
            
    def add_reinforcements_for_new_turn(self):
        reinforcements = self.calculate_total_reinforcements()
        self.add_reinforcements(reinforcements)
            
    def calculate_total_reinforcements(self) -> int:
        return self.calculate_area_bonus() + self.calculate_region_bonus()
    
    def calculate_region_bonus(self) -> int:
        bonus = 0

        for region in self.regions:
            bonus += region.bonus_units

        return bonus
    
    def calculate_area_bonus(self) -> int:
        bonus_units = len(self.areas) / 3
        bonus_units = max(bonus_units, 3)
        
        return math.floor(bonus_units)

    def add_starting_units(self):
        for area in self.areas:
            self.add_reinforcement_to_area(area)
            
    def add_reinforcement_to_area(self, area: Area):
        if self.reinforcements:
            self.reinforcements -= 1
            area.units += 1