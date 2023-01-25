export function generateURL(): string {
  let url = "/";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    const URLLength = 10;
    for (let i = 0; i < URLLength; i++) {
      url += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return url;
}

export async function createGame(numberOfPlayers: number) {
  try {
      return fetch('http://localhost:8000/api/game', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ numPlayers: numberOfPlayers })
      });
  } catch(err) {
      console.error(err);
      return;
  }
}