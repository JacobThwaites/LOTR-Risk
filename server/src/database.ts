const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"

export const db = new sqlite3.Database(DBSOURCE, (err: { message: any; }) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS game (
            uuid TEXT PRIMARY KEY,
            num_players INTEGER NOT NULL,
            CONSTRAINT uuid_unique UNIQUE (uuid)
            )`);

        db.run(`CREATE TABLE IF NOT EXISTS player (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_uuid INTEGER NOT NULL,
                areas TEXT NOT NULL,
                name TEXT NOT NULL,
                FOREIGN KEY(game_uuid) REFERENCES game(uuid)
                )`);
    }
});