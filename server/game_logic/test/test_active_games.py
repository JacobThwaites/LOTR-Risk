import unittest
from game_logic.models.Game import Game
from game_logic.models.Player import Player
from game_logic.models.Area import Area
from game_logic.ActiveGames import ActiveGames


class TestActiveGames(unittest.TestCase):
    def test_creates_game(self):
        num_players = 2
        user_id = 'user_id'
        active_games = ActiveGames()
        game = active_games.create_game(num_players, user_id)
        self.assertEqual(len(game.players), 2)
        self.assertEqual(game.players[0].user_id, user_id)

    def test_get_game_by_id(self):
        active_games = ActiveGames()
        game = active_games.create_game(2, "")
        
        game_by_id = active_games.get_game_by_id(game.uuid)
        self.assertEqual(game, game_by_id)
        
    def test_get_player_by_user_id(self):
        user_id = "user_id"
        active_games = ActiveGames()
        game = active_games.create_game(2, user_id)
        player = active_games.get_player_by_user_id(game.uuid, user_id)
        self.assertEqual(player.user_id, user_id)
        
    def test_deletes_games(self):
        active_games = ActiveGames()
        game = active_games.create_game(2, "")
        self.assertEqual(len(active_games.games_in_progress), 1)
        active_games.delete_game(game.uuid)
        self.assertEqual(len(active_games.games_in_progress), 0)
    
    def test_check_if_game_has_started(self):
        active_games = ActiveGames()
        game = active_games.create_game(2, "user_id")
        self.assertFalse(active_games.has_game_started(game.uuid))
        game.add_user_id_to_next_avaiable_player("a")
        self.assertTrue(active_games.has_game_started(game.uuid))
        
    def test_remove_user_id_from_game(self):
        user_id = "user_id"
        active_games = ActiveGames()
        game = active_games.create_game(2, user_id)
        self.assertEqual(game.players[0].user_id, user_id)
        active_games.remove_user_id_from_game(game.uuid, user_id)
        self.assertEqual(game.players[0].user_id, "")

if __name__ == '__main__':
    unittest.main()
