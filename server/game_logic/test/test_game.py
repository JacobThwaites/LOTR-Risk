import unittest
from game_logic.models.Game import Game
from game_logic.models.Player import Player
from game_logic.models.Area import Area


class TestGame(unittest.TestCase):
    def setUp(self):
        self.player1 = Player("", "")
        self.player2 = Player("", "")
        self.area1 = Area("RHUDAUR")
        self.area2 = Area("ITHILIEN")
        
        self.player1.add_area(self.area1)
        self.area1.player = self.player1
        self.player2.add_area(self.area2)
        self.area2.player = self.player2
        
        self.players = [self.player1, self.player2]
        self.area_list = [self.area1, self.area2]
        self.game = Game(self.players, self.area_list)
        
    def test_auto_generates_uuid(self):
        self.assertEqual(len(self.game.uuid), 8)
    
    def test_tracks_current_players_turn(self):
        self.assertEqual(self.game.current_players_turn, 0)
        
        self.game.handle_new_turn()
        self.assertEqual(self.game.current_players_turn, 1)
        
        self.game.handle_new_turn()
        self.assertEqual(self.game.current_players_turn, 0)
        
    def test_tracks_turn_count(self):
        self.assertEqual(self.game.current_turn, 0)
        [self.game.handle_new_turn() for _ in self.players]
        self.assertEqual(self.game.current_turn, 1)
        
    def test_check_if_players_have_reinforcements_remaining(self):
        self.assertFalse(self.game.players_have_reinforcements())
        self.player1.reinforcements += 1
        self.assertTrue(self.game.players_have_reinforcements())
        
    def test_check_how_many_turns_remaining(self):
        self.assertEqual(self.game.turns_remaining(), 30)
        [self.game.handle_new_turn() for _ in self.players]
        self.assertEqual(self.game.turns_remaining(), 29)

    def test_give_player_territory_card_at_end_of_turn_if_they_captured_area(self):
        self.assertEqual(len(self.player1.territory_cards), 0)
        self.game.handle_capturing_area(self.player1, self.area2)
        self.game.handle_new_turn()
        self.assertEqual(len(self.player1.territory_cards), 1)
        
    def test_dont_give_player_territory_card_at_end_of_turn_if_no_areas_captured(self):
        self.assertEqual(len(self.player1.territory_cards), 0)
        self.game.handle_new_turn()
        self.assertEqual(len(self.player1.territory_cards), 0)
        
    def test_updates_players_list_of_areas_after_area_capture(self):
        self.assertEqual(len(self.player1.areas), 1)
        self.assertEqual(len(self.player2.areas), 1)
        self.assertEqual(self.area2.player, self.player2)
        
        self.game.handle_capturing_area(self.player1, self.area2)
        
        self.assertEqual(len(self.player1.areas), 2)
        self.assertEqual(len(self.player2.areas), 0)
        self.assertEqual(self.area2.player, self.player1)
        
    def test_assigns_starting_units(self):
        [self.assertEqual(player.units, 0) for player in self.players]

        self.game.assign_starting_units()
        
        [self.assertEqual(player.units, 60) for player in self.players]
        
    def test_add_user_id_to_next_available_player(self):
        self.player1.user_id = "user1"
        
        self.assertEqual(self.player2.user_id, "")
        
        user_id = "user2"
        self.game.add_user_id_to_next_avaiable_player(user_id)
        self.assertEqual(self.player2.user_id, user_id)
        
    def test_calculates_total_players_left_to_join(self):
        self.assertEqual(self.game.num_players_left_to_join(), 2)
        self.game.add_user_id_to_next_avaiable_player("user1")
        self.assertEqual(self.game.num_players_left_to_join(), 1)
        self.game.add_user_id_to_next_avaiable_player("user2")
        self.assertEqual(self.game.num_players_left_to_join(), 0)

if __name__ == '__main__':
    unittest.main()
