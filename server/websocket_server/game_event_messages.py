from game_logic.models.Game import Game
from game_logic.models.Area import Area
from game_logic.models.Player import Player
from game_logic.leaderboard import get_leaderboard
from api.ActiveGames import active_games


def generate_leaderboard_update_message(game: Game):
    leaderboard_data = get_leaderboard(game)
    return {
        "type": "LEADERBOARD_UPDATE",
        "id": "1",
        "leaderboardData": leaderboard_data
    }
    

def generate_player_joined_message(game_id: str):
    game = active_games.get_game_by_id(game_id)
    
    if not game:
        print(f'game not found with ID: {game_id}')
        return
    
    return {
        "type": "PLAYER JOINED",
        "playersLeftToJoin": game.num_players_left_to_join()
    }
    

def generate_area_update_message(area: Area):
    return {
        "type": "UPDATE AREA",
        "areaName": area.name,
        "areaUnits": area.units,
        "areaColour": area.player.colour
    }
    

def generate_change_player_message(player_colour: str):
    return {
        "type": "CHANGE PLAYER",
        "playerColour": player_colour
    }


def generate_reinforcements_available_message(reinforcements: int):
    return {
        "type": "REINFORCEMENTS AVAILABLE",
        "reinforcementsAvailable": reinforcements
    }


def generate_end_of_starting_reinforcements_message():
    return {
        "type": "STARTING REINFORCEMENTS END"
    }


def generate_area_reinforcement_message(area: Area):
    return {
        "type": "REINFORCEMENT",
        "areaName": area.name
    }


def generate_territory_card_message(player: Player):
    return {
        "type": "TERRITORY CARDS",
        "cards": player.territory_cards
    }


def generate_end_turn_message(new_current_player_colour: str):
    return {
        "type": "END TURN",
        "newCurrentPlayerColour": new_current_player_colour
    }


def generate_game_over_message():
    return {
        "type": "GAME OVER"
    }
    

def generate_clear_selected_areas_message():
    return {
        "type": "CLEAR SELECTED AREAS"
    }
    

def generate_combat_results_message(attacking_area: Area, defending_area: Area):
    return {
        "type": "COMBAT RESULTS",
        "attackingAreaName": attacking_area.name,
        "attackingAreaUnits": attacking_area.units,
        "attackingAreaColour": attacking_area.player.colour,
        "defendingAreaName": defending_area.name,
        "defendingAreaUnits": defending_area.units,
        "defendingAreaColour": defending_area.player.colour
    }


def generate_unit_move_setup_message(attacking_area: Area, defending_area: Area):
    return {
        "type": "UNIT MOVE SETUP",
        "attackingArea": attacking_area.name,
        "defendingArea": defending_area.name
    }


def generate_unit_move_complete_message():
    return {
        "type": "UNIT MOVE COMPLETE",
    }


def generate_troop_transfer_complete_message():
    return {
        "type": "TROOP TRANSFER COMPLETE",
    }


def generate_territory_cards_message(player: Player):
    return {
        "type": "TERRITORY CARDS",
        "cards": player.territory_cards
    }


def generate_leaderboard_update_message(game: Game):
    leaderboard_data = get_leaderboard(game)
    return {
        "type": "LEADERBOARD UPDATE",
        "leaderboardData": leaderboard_data
    }


def generate_player_disconnect_message(user_colour: str, num_players_left_to_join: int):
    return {
        "type": "PLAYER DISCONNECT",
        "userColour": user_colour,
        "playersLeftToJoin": num_players_left_to_join
    }

def generate_troop_transfer_setup_message():
    return {
        "type": "TROOP TRANSFER SETUP"
    }

def generate_troop_transfer_complete_message():
    return {
        "type": "TROOP TRANSFER COMPLETE"
    }