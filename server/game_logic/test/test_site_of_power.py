import unittest
from game_logic.models.SiteOfPower import SiteOfPower

class TestSiteOfPower(unittest.TestCase):
    def test_has_site_of_power_status(self):
        site_of_power = SiteOfPower("")
        self.assertTrue(site_of_power.is_site_of_power)

if __name__ == '__main__':
    unittest.main()
