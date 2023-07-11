import { Request, Response } from 'express';
import { Game } from './gameLogic/Models/Game';
import { Player } from './gameLogic/Models/Player';
const gameQueries = require("./database/gameQueries");
const playerQueries = require("./database/playerQueries");

export const getGameByUUID = async function (req: Request, res: Response) {
    const game = await gameQueries.getByUUID(req.params.uuid);

    if (!game) {
        res.status(404).json({ 'error': 'No game found with UUID' });
        return;
    }

    const formattedGame = resolveCircularReferences(game);

    res.json({
        "message": "success",
        "data": formattedGame
    });
}

export const createGame = async function (req: Request, res: Response) {
    const errors = []
    if (!req.body.numPlayers) {
        errors.push("Number of players not specified");
    }

    if (req.body.numPlayers < 2 || req.body.numPlayers > 4) {
        errors.push("Invalid number of players provided");
    }

    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    const newGame = gameQueries.createGame(req.body.userID, req.body.numPlayers);
    const formattedGame = resolveCircularReferences(newGame);

    res.status(201).json({
        "message": "success",
        "data": formattedGame
    });
}

export const addUserToGame = async function (req: Request, res: Response) {
    const { uuid } = req.params;
    const { userID } = req.body;
    
    if (!userID) {
        res.status(400).json({ "error": "User ID not specified" });
        return;
    }

    const game = await gameQueries.getByUUID(uuid);

    if (!game) {
        res.status(404).json({ "error": `No game found with uuid ${uuid}` });
        return;
    }
    
    if (isUserIDAlreadyInGame(userID, game)) {
        const formattedGame = resolveCircularReferences(game);
        res.status(200).json({
            "message": "userID already in game",
            "data": formattedGame
        });
        return;
    }

    const nextAvailablePlayer = getNextPlayerWithoutUserID(game.getPlayers());

    if (!nextAvailablePlayer) {
        res.status(500).json({ "error": "No more available players" });
        return;
    }

    const playerUpdateRes = playerQueries.addUserID(nextAvailablePlayer, userID);
    
    if (!playerUpdateRes) {
        res.status(500).json({ "error": "There was an error updating the player" });
        return;
    }

    let updatedGame = await gameQueries.getByUUID(uuid);
    updatedGame = resolveCircularReferences(updatedGame);

    res.status(200).json({
        "message": "success",
        "data": updatedGame
    });
}

function isUserIDAlreadyInGame(userID: string, game: Game): boolean {
    for (const player of game.getPlayers()) {
        if (player.getUserID() === userID) {
            return true;
        }
    }

    return false;
}

function getNextPlayerWithoutUserID(players: Player[]): Player | false {
    for (const player of players) {
        if (!player.getUserID()) {
            return player;
        }
    }

    return false;
}

function resolveCircularReferences(obj: any): any {
    return JSON.parse(stringify(obj));
}

function stringify(obj: any) {
    let cache: any = [];
    let str = JSON.stringify(obj, function(key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // reset the cache
    return str;
  }