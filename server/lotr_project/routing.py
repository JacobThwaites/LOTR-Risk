from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from websocket_server import consumers
from django.core.asgi import get_asgi_application

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter([
        path("game_event/<game_id>/", consumers.GameEventConsumer.as_asgi()),
    ]),
})