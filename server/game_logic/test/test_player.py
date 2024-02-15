import unittest
from game_logic.models.Player import Player
from game_logic.models.Area import Area
from game_logic.enums.regions import rhun_area_names, gondor_area_names

class TestPlayer(unittest.TestCase):
    def test_adds_and_removes_area(self):
        player = Player('', '')
        self.assertEqual(len(player.areas), 0)
        
        area = Area("NORTH_RHUN")
        player.add_area(area)
        self.assertEqual(len(player.areas), 1)
        self.assertEqual(player.areas[0].name, "NORTH_RHUN")
        
        player.remove_area(area)
        self.assertEqual(len(player.areas), 0)
    
    def test_removes_region_if_owns_region_and_removing_area_from_region(self):
        player = Player('', '')

        rhun_areas = [Area(name) for name in rhun_area_names]
        [player.add_area(area) for area in rhun_areas]

        self.assertEqual(len(player.regions), 1)
        self.assertEqual(player.regions[0].name, "RHUN")
        
        player.remove_area(rhun_areas[0])
        self.assertEqual(len(player.regions), 0)
    
    def test_adds_reinforcements_to_area(self):
        player = Player('', '')
        player.reinforcements = 1
        area = Area("NORTH_RHUN")
        self.assertEqual(area.units, 0)
        
        player.add_reinforcement_to_area(area)
        
        self.assertEqual(area.units, 1)
        
    def test_only_add_reinforcements_to_area_if_player_has_reinforcements(self):
        player = Player('', '')
        player.reinforcements = 1
        area = Area("NORTH_RHUN")
        self.assertEqual(area.units, 0)
        self.assertEqual(player.reinforcements, 1)

        player.add_reinforcement_to_area(area)
        self.assertEqual(area.units, 1)
        self.assertEqual(player.reinforcements, 0)
        
        player.add_reinforcement_to_area(area)
        self.assertEqual(area.units, 1)
        self.assertEqual(player.reinforcements, 0)
        
    def test_calculates_region_bonus(self):
        player = Player('', '')
        self.assertEqual(player.calculate_region_bonus(), 0)

        [player.add_area(Area(area_name)) for area_name in rhun_area_names]

        self.assertEqual(player.calculate_region_bonus(), 2)
        
    def test_calculates_area_bonus(self):
        player = Player('', '')
        self.assertEqual(player.calculate_area_bonus(), 3)
        
        gondor_areas = [Area(name) for name in gondor_area_names]
        rhun_areas = [Area(name) for name in rhun_area_names]
        [player.add_area(area) for area in gondor_areas]
        [player.add_area(area) for area in rhun_areas]
        
        self.assertEqual(player.calculate_area_bonus(), 4)

    def test_calculates_total_reinforcements_bonus(self):
        player = Player('', '')

        gondor_areas = [Area(name) for name in gondor_area_names]
        rhun_areas = [Area(name) for name in rhun_area_names]
        [player.add_area(area) for area in gondor_areas]
        [player.add_area(area) for area in rhun_areas]

        self.assertEqual(player.calculate_total_reinforcements(), 13)
        
    def test_adds_one_unit_to_each_area_owned_at_start_of_game(self):
        player = Player('', '')
        areas = [Area("NORTH_RHUN"), Area("CARROCK")]
        [player.add_area(a) for a in areas]
        player.reinforcements = 2
        player.add_starting_units()
        
        for area in areas:
            self.assertEqual(area.units, 1)

if __name__ == '__main__':
    unittest.main()
