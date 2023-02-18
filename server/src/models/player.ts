export default function makePlayer(name: string, areas: string, gameID: string): Player {
    return Object.freeze({
        name: name,
        areas: areas,
        gameID: gameID
    });
}

export interface Player {
    name: string,
    areas: string, 
    gameID: string
}