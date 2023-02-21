export default function makePlayer(name: string, areas: string, gameID: string, userID?: string): Player {
    return Object.freeze({
        name: name,
        areas: areas,
        gameID: gameID,
        userID: userID 
    });
}

export interface Player {
    name: string,
    areas: string, 
    gameID: string,
    userID?: string
}