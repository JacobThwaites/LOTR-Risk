export default function makePlayer(areas: string, gameID: string, userID?: string): Player {
    return Object.freeze({
        areas: areas,
        gameID: gameID,
        userID: userID 
    });
}

export interface Player {
    areas: string, 
    gameID: string,
    userID?: string
}