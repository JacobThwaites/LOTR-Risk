import * as sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


export const allGames = function (req: Request, res: Response) {
    const db = new sqlite3.Database('./db.sqlite');
    const sql = "SELECT g.*, json_group_array(json_object('id', p.id, 'name', p.name, 'areas', p.areas, 'gameUUID', p.game_uuid)) as players FROM game g LEFT JOIN player p ON g.uuid = p.game_uuid GROUP BY g.uuid;";
    const params: any[] = []
    db.all(sql, params, (err: Error, rows: any[]) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": rows
        })
    });
};

export const getGameByUUID = function (req: Request, res: Response) {
    const db = new sqlite3.Database('./db.sqlite');
    const sql = "SELECT g.*, json_group_array(json_object('id', p.id, 'name', p.name, 'areas', p.areas, 'gameUUID', p.game_uuid)) as players FROM game g LEFT JOIN player p ON g.uuid = p.game_uuid WHERE g.uuid = ? GROUP BY g.uuid;";
    
    const params = [req.params.uuid];
    db.get(sql, params, (err: Error, response: Response) => {
        if (err) {
            console.log(err)
            res.status(400).json({ 'error': err })
        }

        else if (!response) {
            res.status(404).json({ 'error': err, 'res': response })
        } else {
            res.json({
                "message": "success",
                "data": response
            })
        }
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

    const db = new sqlite3.Database('./db.sqlite');
    const sql = "SELECT g.*, json_group_array(json_object('id', p.id, 'name', p.name, 'areas', p.areas, 'gameUUID', p.game_uuid)) as players FROM game g LEFT JOIN player p ON g.uuid = p.game_uuid WHERE g.uuid = ? GROUP BY g.uuid;";
    const params = [uuid];
    db.get(sql, params, (err: Error, response: Response) => {
        if (err) {
            console.log('asdfasdfasdf')
            console.log(err)
            res.status(400).json({ 'error': err })
        }

        else if (!response) {
            res.status(404).json({ 'error': err, 'res': response })
        } else {
            res.json({
                "message": "success",
                "data": response
            })
        }
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