import uuid
from game_logic.models.Player import Player
from game_logic.models.Area import Area
from typing import List, Dict
from game_logic.controllers.territory_cards import give_player_territory_card

class Game:
    def __init__(self, players: List[Player], areas: Dict[str, Area]):
        self.uuid = str(uuid.uuid4())[:8]
        self.players = players
        self.areas = areas
        self.current_turn = 0
        self.current_players_turn = 0
        self.has_player_captured_area_this_turn = False
        
    def handle_new_turn(self):
        if self.has_player_captured_area_this_turn:
            self.give_current_player_territory_card()
        
        self.has_player_captured_area_this_turn = False
        self.change_current_player()
        new_current_player = self.players[self.current_players_turn]
        new_current_player.add_reinforcements_for_new_turn()
    
    def give_current_player_territory_card(self):
        current_player = self.players[self.current_players_turn]
        give_player_territory_card(current_player)
    
    def change_current_player(self):
        self.current_players_turn += 1
        if self.current_players_turn > len(self.players) - 1:
            self.current_players_turn = 0
            self.current_turn += 1
            
    def handle_capturing_area(self, attacker: Player, area: Area):
        self.has_player_captured_area_this_turn = True 
        
        defender = area.player
        defender.remove_area(area)
        
        attacker.add_area(area)
        area.player = attacker
    
    def players_have_reinforcements(self) -> bool:
        for player in self.players:
            if player.reinforcements:
                return True 
        
        return False
        
    def turns_remaining(self) -> int:
        MAX_TURNS = 30
        return MAX_TURNS - self.current_turn
    
    def assign_starting_units(self):
        units_available = self.get_total_starting_units()
        for player in self.players:
            player.add_reinforcements(units_available)
            player.add_starting_units()
        
    def get_total_starting_units(self):
        # TODO: remove after testing
        return 34
        
        if len(self.players) == 2:
            return 60
        elif len(self.players) == 3:
            return 52
        else:
            return 45
        
    def add_user_id_to_next_avaiable_player(self, user_id: str):
        for player in self.players:
            if player.user_id == user_id:
                return 
            elif player.user_id == "":
                player.user_id = user_id
                return
            
    def num_players_left_to_join(self):
        total = 0
        
        for player in self.players:
            total += 1 if not player.user_id else 0
            
        return total