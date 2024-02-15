import unittest
from game_logic.models.Player import Player
from controllers.territory_cards import exchange_territory_cards, are_cards_exchangable

class TestTerritoryCardController(unittest.TestCase):
    def setUp(self):
        self.player = Player('', '')
        
    def test_gives_player_4_units_for_3_archer_cards(self):
        self.assertEqual(self.player.reinforcements, 0)
        
        cards = ["ARCHER", "ARCHER", "ARCHER"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 4)
        
    def test_gives_player_4_units_for_archer_cards_with_wild_card(self):
        self.assertEqual(self.player.reinforcements, 0)

        cards = ["ARCHER", "ARCHER", "WILD_CARD"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 4)
        
    def test_gives_player_6_units_for_3_cavalry_cards(self):
        self.assertEqual(self.player.reinforcements, 0)

        cards = ["CAVALRY", "CAVALRY", "CAVALRY"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 6)
        
    def test_gives_player_6_units_for_2_cavalry_cards_and_wild_card(self):
        self.assertEqual(self.player.reinforcements, 0)

        cards = ["CAVALRY", "CAVALRY", "WILD_CARD"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 6)
        
    def test_gives_player_8_units_for_3_eagle_cards(self):
        self.assertEqual(self.player.reinforcements, 0)

        cards = ["EAGLE", "EAGLE", "EAGLE"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 8)

    def test_gives_player_6_units_for_2_eagle_cards_and_wild_card(self):
        self.assertEqual(self.player.reinforcements, 0)

        cards = ["EAGLE", "EAGLE", "WILD_CARD"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 8)
        
    def test_gives_player_10_units_for_archer_cavalry_eagle(self):
        self.assertEqual(self.player.reinforcements, 0)

        cards = ["ARCHER", "CAVALRY", "EAGLE"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 10)
        
    def test_gives_player_10_units_for_3_wild_cards(self):
        self.assertEqual(self.player.reinforcements, 0)

        cards = ["WILD_CARD", "WILD_CARD", "WILD_CARD"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 10)
        
    def test_gives_player_10_units_for_at_least_2_wild_cards(self):
        self.assertEqual(self.player.reinforcements, 0)

        cards = ["WILD_CARD", "WILD_CARD", "EAGLE"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 10)
        
    def test_gives_player_zero_units_for_invalid_combination(self):
        self.assertEqual(self.player.reinforcements, 0)

        cards = ["ARCHER", "ARCHER", "EAGLE"]
        exchange_territory_cards(self.player, cards)
        self.assertEqual(self.player.reinforcements, 0)
        
    def test_removes_card_from_player_after_trade(self):
        player = Player("", "")
        cards = ["ARCHER", "ARCHER", "ARCHER"]
        [player.territory_cards.append(c) for c in cards]
        player.territory_cards.append("EAGLE")
        
        self.assertEqual((len(player.territory_cards)), 4)
        
        exchange_territory_cards(player, cards)
        
        self.assertEqual((len(player.territory_cards)), 1)
        self.assertEqual(player.territory_cards[0], "EAGLE")
        
    def test_returns_true_if_cards_are_exchangable(self):
        cards = ["ARCHER", "ARCHER", "ARCHER"]
        self.assertTrue(are_cards_exchangable(cards))
        
    def test_returns_false_if_cards_are_not_exchangable(self):
        cards = ["ARCHER", "ARCHER", "EAGLE"]
        self.assertFalse(are_cards_exchangable(cards))
        

if __name__ == '__main__':
    unittest.main()
