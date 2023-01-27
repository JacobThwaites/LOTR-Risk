'use strict'
import { db } from './database';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


export const allGames = function(req: Request, res: Response) {
    const sql = "select * from games"
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
    const sql = "select * from games where uuid = ?"
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

    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    let uuid = uuidv4();
    uuid = uuid.substring(0, 8);

    const data = {
        uuid: uuid,
        numPlayers: req.body.numPlayers,
        player1Areas: req.body.player1Areas,
        player2Areas: req.body.player2Areas,
        player3Areas: req.body.player3Areas,
        player4Areas: req.body.player4Areas,
    }

    const sql = 'INSERT INTO games (uuid, num_players, player_1_areas, player_2_areas, player_3_areas, player_4_areas) VALUES (?,?,?,?,?,?)'
    const params = [data.uuid, data.numPlayers, data.player1Areas, data.player2Areas, data.player3Areas, data.player4Areas];
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