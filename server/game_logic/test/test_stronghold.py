import unittest
from game_logic.models.Stronghold import Stronghold

class TestStronghold(unittest.TestCase):
    def test_has_defending_bonus(self):
        stronghold = Stronghold("stronghold")
        self.assertEqual(stronghold.defending_bonus, 1)


if __name__ == '__main__':
    unittest.main()
