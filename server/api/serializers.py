from game_logic.models.Game import Game
from game_logic.models.Player import Player
from game_logic.models.Area import Area

def serialize_game(game: Game):
    return {
        "uuid": game.uuid,
        "players": [serialize_player(p) for p in game.players],
        "currentTurn": 0,
        "maxTurns": 30
    }
    
def serialize_player(player: Player):
    return {
        "userID": player.user_id,
        "colour": player.colour,
        "reinforcements": player.reinforcements,
        "areas": [serialize_area(a) for a in player.areas]
    }
    
def serialize_area(area: Area):
    return {
        "name": area.name,
        "units": area.units,            
    }