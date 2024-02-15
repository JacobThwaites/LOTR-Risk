from game_logic.models.Player import Player
from typing import List
from collections import defaultdict
import random

def exchange_territory_cards(player: Player, cards: List[str]):
    bonus = get_bonus_for_cards(cards)
    player.reinforcements += bonus
    remove_cards_from_player(player, cards)
    
def get_bonus_for_cards(cards: List[str]) -> int:
    card_counts = get_card_counts(cards)
    
    if card_counts["WILD_CARD"] >= 2:
        return 10
    
    if card_counts["ARCHER"] + card_counts["WILD_CARD"] == 3:
        return 4
    
    if card_counts["CAVALRY"] + card_counts["WILD_CARD"] == 3:
        return 6
    
    if card_counts["EAGLE"] + card_counts["WILD_CARD"] == 3:
        return 8
    
    unique_cards_total = card_counts["EAGLE"] + card_counts["CAVALRY"] + card_counts["ARCHER"] + card_counts["WILD_CARD"]
    if is_unique_count(card_counts) and unique_cards_total == 3:
        return 10
    
    return 0
    
def get_card_counts(cards: List[str]) -> defaultdict:
    counts = defaultdict(int)
    
    for card in cards:
        counts[card] += 1
    
    return counts

def is_unique_count(card_counts: defaultdict) -> bool:
    if card_counts["ARCHER"] > 1:
        return False 
    
    if card_counts["CAVALRY"] > 1:
        return False
    
    if card_counts["EAGLE"] > 1:
        return False
    
    return True

def remove_cards_from_player(player: Player, cards: List[str]):
    for card in cards:        
        remove_single_card(player, card)

def remove_single_card(player: Player, card: str):
    for i, c in enumerate(player.territory_cards):
        if c == card:
            player.territory_cards.pop(i)
            return

def are_cards_exchangable(cards: List[str]) -> bool:
    return get_bonus_for_cards(cards) > 0

def give_player_territory_card(player: Player):
    random_num = random.randint(1, 32)
    
    if random_num % 32 == 0:
        player.territory_cards.append("WILD_CARD")
    elif random_num % 32 == 3:
        player.territory_cards.append("EAGLE")
    elif random_num % 32 == 2:        
        player.territory_cards.append("CAVALRY")
    else:
        player.territory_cards.append("ARCHER")