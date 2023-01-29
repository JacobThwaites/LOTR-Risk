import * as sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


export const allGames = async function (req: Request, res: Response) {
    const response: any = await getGamesFromDatabase();

    if (!response) {
        res.status(500).json({ "error": "error retrieving data" });
    }

    for (let i = 0; i < response.length; i++) {
        response[i].players = JSON.parse(response[i].players);
    }

    res.json({
        "message": "success",
        "data": response
    })
};

export const getGameByUUID = async function (req: Request, res: Response) {
    const game: any = await getGameByUUIDFromDatabase(req.params.uuid)

    if (!game) {
        res.status(404).json({ 'error': 'No game found with UUID' })
    }

    game.players = JSON.parse(game.players);

    res.json({
        "message": "success",
        "data": game
    });
}

export const createGame = async function (req: Request, res: Response) {
    const errors = []
    if (!req.body.numPlayers) {
        errors.push("Number of players not specified");
    }
    if (!req.body.players || req.body.players.length !== req.body.numPlayers) {
        errors.push("Invalid number of players provided");
    }

    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    let uuid = uuidv4();
    uuid = uuid.substring(0, 8);

    const gameData = {
        uuid: uuid,
        numPlayers: req.body.numPlayers
    }

    let playerData = req.body.players;

    for (let i = 0; i < playerData.length; i++) {
        playerData[i].gameUUID = uuid;
    }

    const isGameSaved = await saveGame(gameData);
    const arePlayersSaved = await savePlayers(playerData);

    if (!isGameSaved || !arePlayersSaved) {
        res.status(500).json({
            "message": "failed to save data"
        })
    }

    const game: any = await getGameByUUIDFromDatabase(uuid);

    if (!game) {
        res.status(500).json({ 'error': 'There was an error retrieving the game data' })
    }

    game.players = JSON.parse(game.players);

    res.status(201).json({
        "message": "success",
        "data": game
    });
}

type Player = {
    name: string,
    areas: string,
    gameUUID: string
}

async function savePlayers(playerData: Player[]): Promise<boolean> {
    const db = new sqlite3.Database('./db.sqlite');
    return new Promise((resolve, reject) => {
        try {
            db.serialize(() => {
                const sql = 'INSERT INTO player (name, areas, game_uuid) VALUES (?, ?, ?)';

                db.serialize(() => {
                    const stmt = db.prepare(sql);

                    playerData.forEach((player) => {
                        stmt.run(player.name, player.areas, player.gameUUID);
                    });

                    stmt.finalize(() => resolve(true));
                });
            });
        } catch (error) {
            resolve(false);
        }
    });
}

type GameData = {
    uuid: string,
    numPlayers: number
}

async function saveGame(data: GameData): Promise<boolean> {
    const db = new sqlite3.Database('./db.sqlite');
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO game (uuid, num_players) VALUES (?,?)'
            const params = [data.uuid, data.numPlayers];
            db.run(sql, params, (err: Error, response: Response) => {
                if (err) {
                    resolve(false);
                }

                resolve(true);
            });
        } catch (error) {
            resolve(false);
        }
    });
}


async function getGamesFromDatabase() {
    const db = new sqlite3.Database('./db.sqlite');
    return new Promise((resolve, reject) => {
        try {
            const sql = "SELECT g.*, json_group_array(json_object('id', p.id, 'name', p.name, 'areas', p.areas, 'gameUUID', p.game_uuid)) as players FROM game g LEFT JOIN player p ON g.uuid = p.game_uuid GROUP BY g.uuid;";
            const params: any[] = []
            db.all(sql, params, (err: Error, rows: any[]) => {
                if (err) {
                    resolve(false);
                }

                resolve(rows);
            });
        } catch (error) {
            resolve(false);
        }
    });
}

async function getGameByUUIDFromDatabase(uuid: string) {
    const db = new sqlite3.Database('./db.sqlite');
    return new Promise((resolve, reject) => {
        try {
            const sql = "SELECT g.*, json_group_array(json_object('id', p.id, 'name', p.name, 'areas', p.areas, 'gameUUID', p.game_uuid)) as players FROM game g LEFT JOIN player p ON g.uuid = p.game_uuid WHERE g.uuid = ? GROUP BY g.uuid;";

            const params = [uuid];
            db.get(sql, params, (err: Error, response: Response) => {
                if (err) {
                    console.error(err)
                    resolve(false);
                } else if (!response) {
                    resolve(false);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            resolve(false);
        }
    });
}