export default function makeGame(uuid: string, numPlayers: number): Game {
    return Object.freeze({
        uuid: uuid,
        numPlayers: numPlayers,
        isGameOver: false
    });
}

export interface Game {
    uuid: string,
    numPlayers: number,
    isGameOver: boolean
}