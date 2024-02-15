from django.shortcuts import render

def index(request):
    return render(request, "game_event/index.html")

def room(request, game_id):
    return render(request, "game_event/room.html", {"game_id": game_id})