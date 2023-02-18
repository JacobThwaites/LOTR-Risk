const db = require("./db");
import { Game } from "../models/game";
import makeDbHelper from "./helper";

const dbHelper = makeDbHelper();

async function getAll() {
    const rows = await db.query(
        `SELECT * FROM game`
    );

    return rows;
}

async function getByUUID(uuid: string) {
    const query = `SELECT g.*, JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'name', p.name, 'areas', p.areas, 'gameID', p.game_id)) AS players FROM game g LEFT JOIN player p ON g.id = p.game_id WHERE g.id = ? GROUP BY g.id;`;
    const rows = await db.query(query, [uuid]);

    if (!rows) {
        return false;
    }

    return rows[0];
}

async function createGame(game: Game): Promise<boolean> {
    const query = 'INSERT INTO game (id, num_players) VALUES (?,?)';

    const params = [game.uuid, game.numPlayers];
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