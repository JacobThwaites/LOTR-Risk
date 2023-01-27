import { db } from './database';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


export const allPlayers = function(req: Request, res: Response) {
    const sql = "select * from player"
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

export const getPlayerById = function(req: Request, res: Response) {
    const sql = "select * from player where id = ?"
    const params = [req.params.id];

    db.get(sql, params, (err: Error, row: any) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        if (!row) {
            res.status(404).json({ "error": "No player found with ID" });
            return;
        }

        res.json({
            "message": "success",
            "data": row
        })
    });
}

export const createPlayer = function(req: Request, res: Response) {
    const errors = []
    if (!req.body.name) {
        errors.push("Name not specified");
    }
    if (!req.body.gameId) {
        errors.push("Game ID not specified");
    }
    if (!req.body.areas) {
        errors.push("Areas not specified");
    }

    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    let uuid = uuidv4();
    uuid = uuid.substring(0, 8);

    const data = {
        name: req.body.name,
        areas: req.body.areas,
        gameId: req.body.gameId
    }

    const sql = 'INSERT INTO player (name, areas, game_id) VALUES (?,?,?)'
    const params = [data.name, data.areas, data.gameId];
    db.run(sql, params,  (err: Error, response: Response) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }

        res.status(201).json({
            "message": "success",
            "data": data
        })
    });
}