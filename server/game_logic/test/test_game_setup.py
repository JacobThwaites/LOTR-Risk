import unittest
from game_logic.models.Game import Game
from game_logic.models.Player import Player
from game_logic.models.Area import Area
from game_logic.enums.areas import get_areas
from game_logic.controllers.game_setup import generate_players, assign_areas, generate_game


class TestGameSetup(unittest.TestCase):
    def setUp(self):
        self.area1 = Area("RHUDAUR")
        self.area2 = Area("ITHILIEN")

    def test_creates_players(self):
        user_id = "user_id"
        num_players = 2
        players = generate_players(num_players, user_id)
        self.assertEqual(len(players), num_players)
        self.assertEqual(players[0].user_id, user_id)
        self.assertEqual(players[0].colour, "BLACK")
        self.assertEqual(players[1].user_id, "")
        self.assertEqual(players[1].colour, "GREEN")
    
    def test_assigns_areas_to_players(self):
        player1 = Player("", "")
        player2 = Player("", "")
        areas = get_areas()
        assign_areas([player1, player2], areas)
        
        for player in [player1, player2]:
            self.assertEqual(len(player.areas), 32)
            for area in player.areas:
                self.assertEqual(area.player, player)
    
    def test_creates_game_with_specified_num_players(self):
        num_players = 3
        game = generate_game(num_players)
        self.assertEqual(len(game.players), num_players)
    
    def test_generate_game_assigns_areas_and_starting_units(self):
        game = generate_game(4)   
        
        for player in game.players:
            self.assertEqual(len(player.areas), 16)
            self.assertEqual(player.units, 45)
            for area in player.areas:
                self.assertEqual(area.player, player)
                self.assertEqual(area.units, 1)
