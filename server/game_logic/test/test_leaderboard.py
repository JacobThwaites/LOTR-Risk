import unittest
from game_logic.models.Player import Player
from game_logic.models.Area import Area
from game_logic.models.Game import Game
from game_logic.leaderboard import get_leaderboard


class TestLeaderboard(unittest.TestCase):
    def setUp(self):
        self.player1 = Player("", "")
        self.player2 = Player("", "")
        self.player3 = Player("", "")
        self.area1 = Area("ITHILIEN")
        self.area2 = Area("ITHILIEN")
        self.area3 = Area("ITHILIEN")
        self.area4 = Area("ITHILIEN")
        self.area5 = Area("ITHILIEN")
        self.area6 = Area("ITHILIEN")
        self.game = Game(
            [self.player1, self.player2, self.player3],
            [self.area1, self.area2, self.area3, self.area4, self.area5, self.area6]
        )
        
    def test_order_players_firstly_by_num_areas_owned(self):
        self.player1.add_area(self.area1)
        
        self.player3.add_area(self.area2)
        self.player3.add_area(self.area3)
        
        self.player2.add_area(self.area4)
        self.player2.add_area(self.area5)
        self.player2.add_area(self.area6)
        
        leaderboard = get_leaderboard(self.game)
        for i, _ in enumerate(leaderboard):
            if i > 0:
                self.assertGreater(leaderboard[i]["areasControlled"], leaderboard[i-1]["areasControlled"])
                
    def test_order_players_secondly_by_total_units(self):
        self.player1.add_area(self.area1)
        self.player1.add_area(self.area2)

        self.player2.add_area(self.area3)
        self.player2.add_area(self.area4)

        self.player3.add_area(self.area5)
        self.player3.add_area(self.area6)
        
        self.player1.units = 3
        self.player2.units = 1
        self.player3.units = 2

        leaderboard = get_leaderboard(self.game)
        for i, _ in enumerate(leaderboard):
            if i > 0:
                self.assertGreater(leaderboard[i]["totalUnits"], leaderboard[i-1]["totalUnits"])
            
