import { v4 as uuidv4 } from 'uuid';

export default function getUserIDForGame(gameID: string): string {
    let userID = localStorage.getItem(gameID);

    if (userID) {
        return userID;
    }

    userID = uuidv4();
    localStorage.setItem(gameID, userID);

    return userID;
}

export function deleteUserIDForGame(gameID: string): void {
    localStorage.removeItem(gameID);
}