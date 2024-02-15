from game_logic.models.Game import Game
from game_logic.models.Player import Player
from controllers.game_setup import generate_game

class ActiveGames:
    def __init__(self):
        self.games_in_progress = {}

    def create_game(self, num_players: int, user_id: str) -> Game:
        game = generate_game(num_players, user_id)
        self.games_in_progress[game.uuid] = game
        return game
    
    def get_game_by_id(self, id: str) -> Game:
        return self.games_in_progress[id]
    
    def get_player_by_user_id(self, game_id: str, user_id: str) -> Player:
        game = self.games_in_progress[game_id]
        
        for player in game.players:
            if player.user_id == user_id:
                return player
            
    def delete_game(self, game_id: str):
        self.games_in_progress.pop(game_id)
        
    def has_game_started(self, game_id: str) -> bool:
        game = self.get_game_by_id(game_id)
        
        if not game:
            return False
        
        for player in game.players:
            if not player.user_id:
                return False 
            
        return True

    def remove_user_id_from_game(self, game_id: str, user_id: str):
        game = self.get_game_by_id(game_id)
        for player in game.players:
            if player.user_id == user_id:
                player.user_id = ""