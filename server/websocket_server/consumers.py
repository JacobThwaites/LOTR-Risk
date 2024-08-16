import json
from channels.generic.websocket import AsyncWebsocketConsumer
from api.ActiveGames import active_games
import websocket_server.game_event_messages as game_event_messages
from game_logic.controllers.territory_cards import are_cards_exchangable, exchange_territory_cards
from game_logic.controllers.combat_logic import CombatController
import uuid

class GameEventConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_uuid = self.scope.get('query_string').decode('utf-8')
        print('user_uuid')
        print(self.user_uuid)

        self.user_id = str(uuid.uuid4())
        self.game_id = self.scope["url_route"]["kwargs"]["game_id"]
        self.room_group_name = f"game_event_{self.game_id}"

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'forward_group_message',
                'message': game_event_messages.player_joined(self.game_id),
            }
        )

    async def disconnect(self, close_code):
        print('asdf')
        print(self.user_id)
        # TODO: use user_id here instead of one generated in frontend
        game = active_games.get_game_by_id(self.game_id)
        player = active_games.get_player_by_user_id(self.game_id, self.user_id)
        # TODO: use user_id to track heartbeat and disconnection etc.
        # TODO: update num players left after player joins
        # Leave room group
        message = game_event_messages.player_disconnect(
            player.colour, game.num_players_left_to_join())
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'forward_group_message',
                'message': message,
            }
        )
        
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        

    # Receive message from WebSocket
    async def receive(self, text_data):
        message = json.loads(text_data)
        print('message')
        print(message)
        await self.process_message(message)

    # Receive message from room group
    async def game_event_message(self, message):
        print('game_event_message')
        print(message)
    
    async def forward_group_message(self, event):
        await self.send(json.dumps(event['message'], default=str))
    
    async def process_message(self, message):
        game = active_games.get_game_by_id(self.game_id)
        current_player = game.players[game.current_players_turn]
        
        outbound_messages = []
        if message["type"] == "PLAYER JOINED":
            if message["userID"] in [p.user_id for p in game.players]:
                # TODO: handle player reconnect
                print("handle player reconnect")
            else:
                active_games.add_user_id_to_game(self.game_id, message["userID"])

            outbound_messages = [
                game_event_messages.leaderboard_update(active_games.get_game_by_id(self.game_id)),
                game_event_messages.player_joined(self.game_id)
                ]
        elif message["type"] == "PLAYER DISCONNECTED":
            pass
        elif message["type"] == "STARTING REINFORCEMENT":
            area = game.areas[message["areaName"]]
            current_player.add_reinforcement_to_area(area)
            outbound_messages.append(game_event_messages.area_update(area))
            if current_player.reinforcements < 1:
                game.change_current_player()
                current_player = game.players[game.current_players_turn]
                change_player_message = game_event_messages.change_player(
                    current_player.colour)
                outbound_messages.append(change_player_message)
            
            reinforcements_available_message = game_event_messages.reinforcements_available(
                current_player.reinforcements)
            outbound_messages.append(reinforcements_available_message)
            
            if not game.players_have_reinforcements():
                end_of_starting_reinforcements_message = game_event_messages.end_of_starting_reinforcements()
                outbound_messages.append(end_of_starting_reinforcements_message)
        elif message["type"] == "REINFORCEMENT":
            area = game.areas[message["areaName"]]
            current_player.add_reinforcement_to_area(area)
            
            area_reinforcement_message = game_event_messages.area_reinforcement(
                area)
            outbound_messages.append(area_reinforcement_message)
            
            reinforcements_available_message = game_event_messages.reinforcements_available(
                current_player.reinforcements)
            outbound_messages.append(reinforcements_available_message)
        elif message["type"] == "END TURN":
            # TODO: might just be able to use current_player variable
            prev_current_player = game.players[game.current_players_turn]
            game.handle_new_turn()
            
            territory_card_message = game_event_messages.territory_card(
                prev_current_player)
            await self.send(json.dumps(territory_card_message, default=str))
            
            current_player = game.players[game.current_players_turn]
            end_turn_message = game_event_messages.end_turn(
                current_player.colour)
            outbound_messages.append(end_turn_message)
            
            reinforcements_available_message = game_event_messages.reinforcements_available(
                current_player.reinforcements)
            outbound_messages.append(reinforcements_available_message)
            
            leaderboard_update_message = game_event_messages.leaderboard_update(
                game)
            outbound_messages.append(leaderboard_update_message)
            
            if game.turns_remaining() == 0:
                game_over_message = game_over_message()
                outbound_messages.append(game_over_message)
        elif message["type"] == "TRADE TERRITORY CARDS":
            if not are_cards_exchangable(message["territoryCards"]):
                return
            
            player = next(
                (p for p in game.players if p.user_id == message["userID"]), None)

            if not player:
                return
            
            exchange_territory_cards(player, message["territoryCards"])
            
            reinforcements_available_message = game_event_messages.reinforcements_available(
                player.reinforcements)
            await self.send(json.dumps(reinforcements_available_message, default=str))
            
            territory_card_message = game_event_messages.territory_card(
                player)
            await self.send(json.dumps(territory_card_message, default=str))
        elif message["type"] == "CLEAR SELECTED AREAS":
            clear_selected_areas_message = game_event_messages.clear_selected_areas()
            outbound_messages.append(clear_selected_areas_message)
        elif message["type"] == "COMBAT":
            attacking_area = game.areas[message["attackingArea"]]
            defending_area = game.areas[message["defendingArea"]]
            combat_controller = CombatController(attacking_area, defending_area, game)
            
            combat_controller.process_combat(message["numAttackingDice"])
            combat_results_message = game_event_messages.combat_results(
                attacking_area, defending_area)
            outbound_messages.append(combat_results_message)
            
            if defending_area.units <= 0:
                unit_move_setup_message = game_event_messages.unit_move_setup(
                    attacking_area, defending_area)
                outbound_messages.append(unit_move_setup_message)
            
            leaderboard_update_message = game_event_messages.leaderboard_update(
                game)
            outbound_messages.append(leaderboard_update_message)
        elif message["type"] == "UNIT MOVE":
            origin = game.areas[message["origin"]]
            destination = game.areas[message["destination"]]
            origin.units -= message["numUnits"]
            destination.units += message["numUnits"]
            
            origin_update_message = game_event_messages.area_update(origin)
            outbound_messages.append(origin_update_message)
            destination_update_message = game_event_messages.area_update(
                destination)
            outbound_messages.append(destination_update_message)
            
            unit_move_complete_message = game_event_messages.unit_move_complete()
            outbound_messages.append(unit_move_complete_message)
        elif message["type"] == "TROOP TRANSFER SETUP":
            message = game_event_messages.troop_transfer_setup()
            outbound_messages.append(message)
        elif message["type"] == "TROOP TRANSFER":
            origin = game.areas[message["origin"]]
            destination = game.areas[message["destination"]]
            origin.units -= message["numUnits"]
            destination.units += message["numUnits"]

            origin_update_message = game_event_messages.area_update(origin)
            outbound_messages.append(origin_update_message)
            destination_update_message = game_event_messages.area_update(
                destination)
            outbound_messages.append(destination_update_message)
            
            transfer_complete_message = game_event_messages.troop_transfer_complete()
            outbound_messages.append(transfer_complete_message)
        elif message["type"] == "GAME OVER DISCONNECTION":
            game_over_message = game_event_messages.game_over()
            outbound_messages.append(game_over_message)
            
        for m in outbound_messages:
            # TODO: might not need to await 
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'forward_group_message',
                    'message': m,
                }
            )
