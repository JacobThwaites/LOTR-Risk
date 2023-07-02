import { v4 as uuidv4 } from 'uuid';

export function getUserIDForGame(gameID: string): string | null {
    let userID = localStorage.getItem(gameID);

    if (userID) {
        return userID;
    }

    return null;
}

export function generateUserID(): string {
    return uuidv4();
}

export function deleteUserIDForGame(gameID: string): void {
    localStorage.removeItem(gameID);
}

export function saveUserIDToLocalStorage(gameID: string, userID: string): void {
    localStorage.setItem(gameID, userID);
}