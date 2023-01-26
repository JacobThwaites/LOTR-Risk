export async function saveGame(numPlayers: number, playerAreas: Array<string | null>) {
  try {
    const body = {
        numPlayers: numPlayers,
        player1Areas: playerAreas[0],
        player2Areas: playerAreas[1],
        player3Areas: playerAreas[2],
        player4Areas: playerAreas[3]
    }

      return fetch('http://localhost:8000/api/game', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      });
  } catch(err) {
      console.error(err);
      return;
  }
}

export async function getGame(gameUuid: string) {
    try {
        return fetch(`http://localhost:8000/api/game/${gameUuid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    } catch(err) {
        console.error(err);
        return;
    }
  }