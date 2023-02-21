import mysql from 'mysql2';
const dbConfig = require("./config");

export default function setupDatabase() {
    const connection = mysql.createConnection(dbConfig);
    connection.connect(function (err: any) {
        if (err) {
            return console.error('error: ' + err.message);
        }

        const createDatabase = `CREATE DATABASE IF NOT EXISTS risk`;

        const createGame = `CREATE TABLE IF NOT EXISTS game (
            id CHAR(36),
            num_players INTEGER NOT NULL,
            PRIMARY KEY (id)
            )`;

        const createPlayers = `CREATE TABLE IF NOT EXISTS player (
            id INTEGER NOT NULL AUTO_INCREMENT,
            game_id CHAR(36) NOT NULL,
            areas TEXT NOT NULL,
            name TEXT NOT NULL,
            user_id CHAR(36),
            PRIMARY KEY (id),
            FOREIGN KEY(game_id) REFERENCES game(id)
            )`;

        connection.query(createDatabase, function (err, result) {
                if (err) {
                    console.log("couldn't create database");
                    throw err;
                }
              });

        connection.query(createGame, function (err: Error, results: any, fields: any) {
            if (err) {
                console.log(err.message);
                throw err;
            }
        });

        connection.query(createPlayers, function (err: Error, results: any, fields: any) {
            if (err) {
                console.log(err.message);
                throw err;
            }
        });

        connection.end(function (err: Error) {
            if (err) {
                console.log(err.message);
                throw err;
            }
        });
    });

}