import { Request, Response } from 'express';
import makePlayer from './models/player';
const playerQueries = require("./database/playerQueries");


export const allPlayers = function (req: Request, res: Response) {
    const players = playerQueries.getAll();
    res.json({
        "message": "success",
        "data": players
    });
};

export const getPlayerById = async function (req: Request, res: Response) {
    const player = await playerQueries.getPlayerById(req.params.id);

    if (!player) {
        res.status(404).json({ "error": "No player found with ID" });
    }

    res.json({
        "message": "success",
        "data": player
    })
}

export const createPlayer = async function (req: Request, res: Response) {
    const errors = []
    if (!req.body.name) {
        errors.push("Name not specified");
    }
    if (!req.body.gameID) {
        errors.push("Game ID not specified");
    }
    if (!req.body.areas) {
        errors.push("Areas not specified");
    }

    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    const player = makePlayer(req.body.name, req.body.areas, req.body.gameID, req.body.userID);
    const dbRes = await playerQueries.createPlayer(player);

    if (!dbRes) {
        res.status(500).json({ "error": "There was an error creating the Player" });
        return;
    }

    res.status(201).json({
        "message": "success",
        "data": dbRes
    });
}

export const updatePlayer = async function (req: Request, res: Response) {
    const { id } = req.params;
    const { userID } = req.body;
    
    if (!userID) {
        res.status(400).json({ "error": "User ID not specified" });
        return;
    }

    const dbRes = await playerQueries.updatePlayer(id, userID);

    if (!dbRes) {
        res.status(500).json({ "error": "There was an error updating the Player" });
        return;
    }

    res.status(200).json({
        "message": "success"
    });
}