from game_logic.models.Game import Game
from game_logic.models.Area import Area
from game_logic.models.Player import Player
from game_logic.leaderboard import get_leaderboard
from api.ActiveGames import active_games


def leaderboard_update(game: Game):
    leaderboard_data = get_leaderboard(game)
    return {
        "type": "LEADERBOARD_UPDATE",
        "id": "1",
        "leaderboardData": leaderboard_data
    }
    

def player_joined(game_id: str):
    game = active_games.get_game_by_id(game_id)
    
    if not game:
        print(f'game not found with ID: {game_id}')
        return
    
    return {
        "type": "PLAYER JOINED",
        "playersLeftToJoin": game.num_players_left_to_join()
    }
    

def area_update(area: Area):
    return {
        "type": "UPDATE AREA",
        "areaName": area.name,
        "areaUnits": area.units,
        "areaColour": area.player.colour
    }
    

def change_player(player_colour: str):
    return {
        "type": "CHANGE PLAYER",
        "playerColour": player_colour
    }


def reinforcements_available(reinforcements: int):
    return {
        "type": "REINFORCEMENTS AVAILABLE",
        "reinforcementsAvailable": reinforcements
    }


def end_of_starting_reinforcements():
    return {
        "type": "STARTING REINFORCEMENTS END"
    }


def area_reinforcement(area: Area):
    return {
        "type": "REINFORCEMENT",
        "areaName": area.name
    }


def territory_card(player: Player):
    return {
        "type": "TERRITORY CARDS",
        "cards": player.territory_cards
    }


def end_turn(new_current_player_colour: str):
    return {
        "type": "END TURN",
        "newCurrentPlayerColour": new_current_player_colour
    }


def game_over():
    return {
        "type": "GAME OVER"
    }
    

def clear_selected_areas():
    return {
        "type": "CLEAR SELECTED AREAS"
    }
    

def combat_results(attacking_area: Area, defending_area: Area):
    return {
        "type": "COMBAT RESULTS",
        "attackingAreaName": attacking_area.name,
        "attackingAreaUnits": attacking_area.units,
        "attackingAreaColour": attacking_area.player.colour,
        "defendingAreaName": defending_area.name,
        "defendingAreaUnits": defending_area.units,
        "defendingAreaColour": defending_area.player.colour
    }


def unit_move_setup(attacking_area: Area, defending_area: Area):
    return {
        "type": "UNIT MOVE SETUP",
        "attackingArea": attacking_area.name,
        "defendingArea": defending_area.name
    }


def unit_move_complete():
    return {
        "type": "UNIT MOVE COMPLETE",
    }


def troop_transfer_complete():
    return {
        "type": "TROOP TRANSFER COMPLETE",
    }


def territory_cards(player: Player):
    return {
        "type": "TERRITORY CARDS",
        "cards": player.territory_cards
    }


def leaderboard_update(game: Game):
    leaderboard_data = get_leaderboard(game)
    return {
        "type": "LEADERBOARD UPDATE",
        "leaderboardData": leaderboard_data
    }


def player_disconnect(user_colour: str, num_players_left_to_join: int):
    return {
        "type": "PLAYER DISCONNECT",
        "userColour": user_colour,
        "playersLeftToJoin": num_players_left_to_join
    }

def troop_transfer_setup():
    return {
        "type": "TROOP TRANSFER SETUP"
    }

def troop_transfer_complete():
    return {
        "type": "TROOP TRANSFER COMPLETE"
    }