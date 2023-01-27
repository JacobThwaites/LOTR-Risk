'use strict'
const db = require("./database.js")
const { v4: uuidv4 } = require('uuid');


exports.allGames = function(req, res) {
    const sql = "select * from games"
    const params = []
    db.all(sql, params, (err, rows) => {
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

exports.getGameByUUID = function(req, res, next) {
    const sql = "select * from games where uuid = ?"
    const params = [req.params.uuid];

    db.get(sql, params, (err, row) => {
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

exports.createGame = function(req, res, next) {
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
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.status(201).json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
}