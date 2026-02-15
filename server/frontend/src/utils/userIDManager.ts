import { v4 as uuidv4 } from 'uuid';

export function getUserID(): string {
    let userID = localStorage.getItem("userID");

    if (!userID) {
        userID = uuidv4();
        localStorage.setItem("userID", userID);
    }

    return userID;
}