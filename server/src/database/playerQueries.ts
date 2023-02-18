const db = require("./db");
import { Player } from "../models/player";

async function getAll() {
    const rows = await db.query(
        `SELECT * FROM player`
    );

    return rows;
}

async function getPlayerById(id: number) {
    const rows = await db.query(
        'SELECT * FROM player WHERE id = ?', 
        [id]
    );

    return rows;
}

async function createPlayer(player: Player) {
    const query = `INSERT INTO player (name, areas, game_id) VALUES (?,?,?)`;

    const params = [player.name, player.areas, player.gameID];
    const res = await db.execute(query, params);
    return res;
}

async function createMultiplePlayers(players: Player[]) {
    const query = 'INSERT INTO player (name, areas, game_id) VALUES ?';
    const rows = convertPlayersToRows(players);
    const res = await db.query(query, [rows]);

    return res;
}

function convertPlayersToRows(players: Player[]): String[][] {
    const rows: String[][] = [];

    players.forEach(player => {
        rows.push([player.name, player.areas, player.gameID]);
    });
    
    return rows;
}

module.exports = {
    getAll,
    createPlayer,
    createMultiplePlayers,
    getPlayerById
};