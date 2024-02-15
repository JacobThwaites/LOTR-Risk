from game_logic.models.Game import Game

def get_leaderboard(game: Game):
    leaders = []
    for player in game.players:
        leaders.append({
            "colour": player.colour,
            "areasControlled": len(player.areas),
            "totalUnits": player.units
        })
    
    return sorted(leaders, key=custom_sort_key)


def custom_sort_key(entry):
    return (entry["areasControlled"], entry["totalUnits"])
