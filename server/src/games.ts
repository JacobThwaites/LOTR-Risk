import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import makeGame, { Game } from './models/game';
import { Player } from './models/player';
const gameQueries = require("./database/gameQueries");
const playerQueries = require("./database/playerQueries");

export const allGames = async function (req: Request, res: Response) {
    const response = await gameQueries.getAll();

    if (!response) {
        res.status(500).json({ "error": "error retrieving data" });
    }

    res.json({
        "message": "success",
        "data": response
    })
};

export const getGameByUUID = async function (req: Request, res: Response) {
    const game = await gameQueries.getByUUID(req.params.uuid);

    if (!game) {
        res.status(404).json({ 'error': 'No game found with UUID' });
        return;
    }

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

    const gameData: Game = makeGame(uuid, req.body.numPlayers);

    const players = [];

    for (let i = 0; i < req.body.players.length; i++) {
        const player: Player = {
            areas: req.body.players[i].areas,
            gameID: uuid,
            userID: req.body.players[i].userID,
        }

        players.push(player);
    }

    const gameResponse = await gameQueries.createGame(gameData);
    const playersResponse = await playerQueries.createMultiplePlayers(players);

    if (!gameResponse || !playersResponse) {
        res.status(500).json({
            "message": "failed to save data"
        })
    }

    const game = await gameQueries.getByUUID(uuid);

    if (!game) {
        res.status(500).json({ 'error': 'There was an error retrieving the game data' });
        return;
    }

    res.status(201).json({
        "message": "success",
        "data": game
    });
}