from django.http import HttpResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def game_view(request, id):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"game_{id}",
        {
            'type': 'game_event_message',
            'message': f"User {request.user} entered the game."
        }
    )
    return HttpResponse("Connected to WebSocket.")