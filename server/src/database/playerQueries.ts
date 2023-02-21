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
    try {
        const query = `INSERT INTO player (name, areas, game_id, user_id) VALUES (?,?,?,?)`;
    
        const params = [player.name, player.areas, player.gameID, player.userID ? player.userID : null];
        const res = await db.execute(query, params);
        return res;
    } catch(e: any) {
        return false;
    }
}

async function createMultiplePlayers(players: Player[]) {
    const query = 'INSERT INTO player (name, areas, game_id, user_id) VALUES ?';
    const rows = convertPlayersToRows(players);
    const res = await db.query(query, [rows]);

    return res;
}

function convertPlayersToRows(players: Player[]): Array<Array<string | undefined>> {
    const rows: Array<Array<string | undefined>> = [];

    players.forEach(player => {
        rows.push([player.name, player.areas, player.gameID, player.userID]);
    });
    
    return rows;
}

async function updatePlayer(playerID: number, userID: number) {
    const query = 'UPDATE player SET user_id = ? WHERE id = ?';
    const params = [userID, playerID];
    const res = await db.query(query, params);

    return res;
}

module.exports = {
    getAll,
    createPlayer,
    createMultiplePlayers,
    getPlayerById,
    updatePlayer
};