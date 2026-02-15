import { getUserID } from "../../utils/userIDManager";

export async function saveGame(numPlayers: number, gameType: 'online' | 'local') {
    try {
        const body = {
            numPlayers: numPlayers,
            gameType
        }
        return fetch(`http://${process.env.REACT_APP_SERVER_URL}/api/game`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err);
        return;
    }
}

export async function addUserIDToGame(gameID: string): Promise<any> {
    try {
        const userID = getUserID();

        const res = await fetch(`http://${process.env.REACT_APP_SERVER_URL}/api/game/${gameID}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID })
        });

        if (!res.ok) {
            throw new Error("Failed to update player userID");
        }

        return res;
    } catch (error: any) {
        console.error(error);
        return false;
    }
}