import unittest
from unittest.mock import patch
from game_logic.models.Player import Player
from game_logic.models.Area import Area
from game_logic.models.Stronghold import Stronghold
from game_logic.models.Game import Game
from controllers.combat_logic import CombatController


def mock_attacker_winning(attacking_rolls: int, defending_rolls: int):
    return "attacker"

class TestCombatLogic(unittest.TestCase):
    def setUp(self):
        self.attacking_area = Area("TOWER_HILLS")
        self.defending_area = Area("EVENDIM_HILLS")
        self.attacker = Player('', '')
        self.defender = Player('', '')
        self.attacker.add_area(self.attacking_area)
        self.defender.add_area(self.defending_area)
        self.attacking_area.player = self.attacker
        self.defending_area.player = self.defender
        self.areas = {"TOWER_HILLS": self.attacking_area, "EVENDIM_HILLS": self.defending_area}
        self.game = Game([self.attacker, self.defender], self.areas)
                
    # TODO: fix mocking function
    @patch('controllers.combat_logic.CombatController.first_dice_combat', autospec=True)
    def test_remove_units_from_defender_if_attacker_wins(self, mock_attacker_winning):
        self.attacker.units = 2
        self.defender.units = 2
        self.attacking_area.units = 2
        self.defending_area.units = 2
        combat_controller = CombatController(self.attacking_area, self.defending_area, self.game)
        combat_controller.handle_results(["attacker"])
        
        self.assertEqual(self.defender.units, 1)
        
    def test_remove_units_from_attacker_if_defender_wins(self):
        self.attacker.units = 2
        self.defender.units = 2
        self.attacking_area.units = 2
        self.defending_area.units = 2
        combat_controller = CombatController(
            self.attacking_area, self.defending_area, self.game)
        combat_controller.handle_results(["defender"])

        self.assertEqual(self.attacker.units, 1)
        
    def test_calculates_attacking_bonus_for_area(self):
        area = Area("area")
        combat_controller = CombatController(
            area, self.defending_area, self.game)
        
        self.assertEqual(combat_controller.get_attacker_bonus(), 0)
        area.has_leader = True
        self.assertEqual(combat_controller.get_attacker_bonus(), 1)
        
    def test_calculates_attacking_bonus_for_area(self):
        stronghold = Stronghold("stronghold")
        combat_controller = CombatController(
            stronghold, self.defending_area, self.game)

        self.assertEqual(combat_controller.get_attacker_bonus(), 0)
        stronghold.has_leader = True
        self.assertEqual(combat_controller.get_attacker_bonus(), 1)
    
    def test_calculates_defending_bonus_for_area(self):
        area = Area("area")
        combat_controller = CombatController(
            self.attacking_area, area, self.game)

        self.assertEqual(combat_controller.get_defender_bonus(), 0)
        area.has_leader = True
        self.assertEqual(combat_controller.get_defender_bonus(), 1)
        
    def test_calculates_defending_bonus_for_stronghold(self):
        stronghold = Stronghold("stronghold")
        combat_controller = CombatController(
            self.attacking_area, stronghold, self.game)

        self.assertEqual(combat_controller.get_defender_bonus(), 1)
        stronghold.has_leader = True
        self.assertEqual(combat_controller.get_defender_bonus(), 2)
        
    def test_changes_area_owner_if_no_defending_units_remaining(self):
        # TODO: implement test
        self.assertTrue(False)

if __name__ == '__main__':
    unittest.main()
