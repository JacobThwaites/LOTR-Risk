from game_logic.models.Area import Area

class Stronghold(Area):
    def __init__(self, name: str):
        self.name = name
        self.player = None
        self.is_site_of_power = False
        self.has_leader = False
        self.units = 0
        self.defending_bonus = 1
