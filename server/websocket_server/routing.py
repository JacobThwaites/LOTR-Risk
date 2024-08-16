from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"game_event/(?P<game_id>\w+)/$", consumers.GameEventConsumer.as_asgi()),
]