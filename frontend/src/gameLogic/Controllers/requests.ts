import { getUserID } from "../../utils/userIDManager";
import { Player } from "../Models/Player";

export async function saveGame(numPlayers: number, playerAreas: Array<string>) {
    const players = formatPlayerData(playerAreas);

    try {
        const body = {
            numPlayers: numPlayers,
            players: players
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

function formatPlayerData(playerAreas: Array<string>): Array<{ areas: string }> {
    const players = [];

    const firstPlayer = {
        areas: playerAreas[0]
    }
    players.push(firstPlayer);

    for (let i = 1; i < playerAreas.length; i++) {
        const player = { areas: playerAreas[i] };
        players.push(player)
    }

    return players;
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