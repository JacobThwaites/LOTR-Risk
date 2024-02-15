from typing import List

class Region():
    def __init__(self, name: str, area_names: List[str], bonus_units: int):
        self.name = name
        self.area_names = area_names
        self.bonus_units = bonus_units