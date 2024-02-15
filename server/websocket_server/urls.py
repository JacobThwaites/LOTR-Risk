from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("<str:game_id>/", views.room, name="room"),
]