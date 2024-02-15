from typing import List
from ninja import NinjaAPI, Schema
from ninja.errors import HttpError
from django.http import JsonResponse
from .ActiveGames import active_games
from .serializers import serialize_game
# from django.contrib.auth.tokens import default_token_generator

api = NinjaAPI()

# TODO: change this to match websocket
# TODO: add tests for these routes

@api.get('/game/{id}')
def get_game(request, id: str):
    game = active_games.get_game_by_id(id)
    
    if not game:
        raise HttpError(404, 'Error: Game not found')
    
    serialized_game = serialize_game(game)
    return JsonResponse(serialized_game)


class GameIn(Schema):
    numPlayers: int
    userID: str

@api.post('/game')
def create_game(request, payload: GameIn):
    game = active_games.create_game(payload.numPlayers, payload.userID)
    serialized_game = serialize_game(game)
    return JsonResponse(serialized_game)


class UserIdIn(Schema):
    userID: str

@api.patch('/game/{id}')
def add_user_id_to_game(request, id: str, payload: UserIdIn):
    game = active_games.get_game_by_id(id)

    if not game:
        raise HttpError(404, f'No game found with id {id}')
    
    if payload.userID in [p.user_id for p in game.players]:
        return JsonResponse(serialize_game(game))

    game = active_games.add_user_id_to_game(id, payload.userID)
    return JsonResponse(serialize_game(game))

