import unittest
from game_logic.models.Area import Area

class TestArea(unittest.TestCase):
    def setUp(self):
        self.area = Area('area')
        self.file_path = 'test_file.txt'
    
    def test_is_not_site_of_power(self):
        self.assertFalse(self.area.is_site_of_power)
           
    def test_tracks_units(self):
        self.assertEqual(self.area.units, 0)
        self.area.units += 5
        self.assertEqual(self.area.units, 5)
        
    def test_has_no_defending_bonus(self):
        self.assertEqual(self.area.defending_bonus, 0)
        
if __name__ == '__main__':
    unittest.main()
