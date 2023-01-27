'use strict'
import * as sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


export const allGames = function(req: Request, res: Response) {
    const db = new sqlite3.Database('./db.sqlite');
    const sql = "select * from game"
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

export const getGameByUUID = function(req: Request, res: Response) {
    const db = new sqlite3.Database('./db.sqlite');
    const sql = "select * from game where uuid = ?"
    const params = [req.params.uuid];

    db.get(sql, params, (err: Error, row: any) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        if (!row) {
            res.status(404).json({ "error": "No game found with UUID" });
            return;
        }

        res.json({
            "message": "success",
            "data": row
        })
    });
}

export const createGame = function(req: Request, res: Response) {
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

    const isGameSaved = saveGame(gameData);
    const arePlayersSaved = savePlayers(req.body.players);

    if (!isGameSaved || !arePlayersSaved) {
        res.status(500).json({
            "message": "failed to save data"
        })
    }

    res.status(201).json({
        "message": "success",
        "data": gameData
    })
}

type Player = {
    name: string,
    areas: string
}

function savePlayers(playerData: Player[]): boolean {
    const db = new sqlite3.Database('./db.sqlite');

    try {
        const sql = 'INSERT INTO player (name, areas) VALUES (?, ?)';
    
        db.serialize(() => {
            const stmt = db.prepare(sql);
        
            playerData.forEach((player) => {
                stmt.run(player.name, player.areas);
            });
        
            stmt.finalize();
        });
    
        return true;
    } catch(err: any) {
        console.error(err);
        return false;
    } finally {
        db.close();
    }
}

type GameData = {
    uuid: string,
    numPlayers: number
}

function saveGame(data: GameData): boolean {
    const db = new sqlite3.Database('./db.sqlite');

    try {
        const sql = 'INSERT INTO game (uuid, num_players) VALUES (?,?)'
        const params = [data.uuid, data.numPlayers];
        db.run(sql, params,  (err: Error, response: Response) => {
            if (err) {
                return false;
            }
        });

        return true;
    } catch(err: any) {
        console.error(err);
        return false;
    } finally {
        db.close();
    }
}