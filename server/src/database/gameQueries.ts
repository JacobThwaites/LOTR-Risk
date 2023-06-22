const db = require("./db");
import { Game } from "../models/game";

async function getAll() {
    const rows = await db.query(
        `SELECT * FROM game`
    );

    return rows;
}

async function getByUUID(uuid: string) {
    const query = `SELECT g.*, JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'areas', p.areas, 'gameID', p.game_id, 'userID', p.user_id)) AS players FROM game g LEFT JOIN player p ON g.id = p.game_id WHERE g.id = ? GROUP BY g.id;`;
    const rows = await db.query(query, [uuid]);

    if (!rows) {
        return false;
    }

    return rows[0];
}

async function createGame(game: Game): Promise<boolean> {
    const query = 'INSERT INTO game (id, num_players, is_game_over) VALUES (?,?, ?)';

    const params = [game.uuid, game.numPlayers, false];
    const res = await db.execute(query, params);

    if (!res) {
        return false;
    }

    return true;
}

module.exports = {
    getAll,
    getByUUID,
    createGame
};