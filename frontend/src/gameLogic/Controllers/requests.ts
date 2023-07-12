import { getUserID } from "../../utils/userIDManager";
import { Player } from "../Models/Player";

export async function saveGame(numPlayers: number) {

    try {
        const body = {
            numPlayers: numPlayers,
            userID: getUserID() 
        }

        return fetch(`http://${process.env.REACT_APP_BASE_URL}/api/game`, {
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

export async function getGame(gameID: string) {
    try {
        return fetch(`http://${process.env.REACT_APP_BASE_URL}/api/game/${gameID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    } catch (err) {
        console.error(err);
        return {ok: false, json: () => {}};
    }
}

export async function addUserIdToPlayer(player: Player, userID: string): Promise<boolean> {
    try {
        const playerID = player.getID();
        const res = await fetch(`http://${process.env.REACT_APP_BASE_URL}/api/player/${playerID}`, {
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

        return true;
    } catch (err: any) {
        console.error(err.message);
        return false;
    }
}

export async function addUserIDToGame(gameID: string): Promise<any> {
    try {
        const userID = getUserID();

        const res = await fetch(`http://${process.env.REACT_APP_BASE_URL}/api/game/${gameID}`, {
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