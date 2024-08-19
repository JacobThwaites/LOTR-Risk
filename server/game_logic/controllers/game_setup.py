from typing import List, Dict
from game_logic.models.Player import Player
from game_logic.models.Area import Area
from game_logic.models.Game import Game
from game_logic.enums.areas import get_areas
import random

def generate_game(num_players: int, game_type: str) -> Game:
    players = generate_players(num_players)
    areas = get_areas()
    assign_areas(players, areas)
    game = Game(players, areas, game_type)
    game.assign_starting_units()
    return game

def generate_players(num_players: int) -> List[Player]:
    players = []
    
    for i in range(num_players):
        colour = generate_colour(i)
        players.append(Player(colour))
    
    return players

def generate_colour(index: int) -> str:
    colours = ["BLACK", "GREEN", "RED", "YELLOW"]
    return colours[index]

def assign_areas(players: List[Player], areas: Dict[str, Area]):
    area_lists = create_area_lists(len(players), areas)
    
    for i, player_areas in enumerate(area_lists):
        for area in player_areas:
            players[i].add_area(area)
            area.player = players[i]

def create_area_lists(num_players: int, areas: Dict[str, Area]) -> List[List[Area]]:
    player_areas = [[] for _ in range(num_players)]
    shuffled_areas = random.sample(list(areas.values()), len(areas.values()))
    
    player_index = 0
    for area in shuffled_areas:
        player_areas[player_index].append(area)
        player_index = (player_index + 1) % num_players
    
    return player_areas