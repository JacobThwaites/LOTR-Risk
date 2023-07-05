const gameQueries = require("./database/gameQueries");
const playerQueries = require("./database/playerQueries");
import makePlayer from './models/player';
import makeGame, { Game } from './models/game';
const app = require('./index');

import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
require('jest');

let gameId: any;

describe('POST /api/game', function () {
  it('save a game to the database', function (done) {
    const payload = {
      numPlayers: 2,
      players: [
        {
          areas: "area1",
          userID: "userID"
        },
        {
          areas: "area2"
        }
      ]
    }

    request(app)
      .post('/api/game')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err: Error, res: request.Response) {
        expect(res.body.data.num_players).toEqual(payload.numPlayers);
        expect(res.body.data.players).toHaveLength(2);
        expect(res.body.data.players[0].areas).toEqual('area1');
        expect(res.body.data.players[0].userID).toEqual('userID');
        expect(res.body.data.id).toBeDefined();
        gameId = res.body.data.id;
        expect(res.statusCode).toEqual(201);
        if (err) return done(err);
        done();
      })
  });
});

describe('GET /api/game/:gameId', function () {
  it('get game by gameId', function (done) {
    request(app)
      .get(`/api/game/${gameId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body.data.id).toEqual(gameId);
        expect(res.statusCode).toEqual(200);
        if (err) return done(err);
        done();
      })
  });
});


describe('PATCH /api/game/:gameId', function () {
  let gameID: string;
  let fullGameID: string;

  beforeEach(async () => {
    gameID = uuidv4();
    gameID = gameID.substring(0, 8);
    const numberOfPlayers = 2;
    const gameData: Game = makeGame(gameID, numberOfPlayers);
    await gameQueries.createGame(gameData);

    for (let i = 0; i < numberOfPlayers; i++) {
      const testPlayer = makePlayer('', gameID);
      const res = await playerQueries.createPlayer(testPlayer);

      if (i === 0) {
        const playerID = res[0].insertId;
        await playerQueries.addUserID(playerID, i);
      }
    }

    fullGameID = uuidv4();
    fullGameID = fullGameID.substring(0, 8);
    const fullGameData: Game = makeGame(fullGameID, numberOfPlayers);
    await gameQueries.createGame(fullGameData);

    for (let i = 0; i < numberOfPlayers; i++) {
      const testPlayer = makePlayer('', fullGameID);
      const res = await playerQueries.createPlayer(testPlayer);
      const playerID = res[0].insertId;
      await playerQueries.addUserID(playerID, i);
    }
  });

  it('can add a userID to the next available player in a game if there are spaces remaining', function (done) {
    const payload = {
      userID: "ID"
    };

    request(app)
      .patch(`/api/game/${gameID}`)
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err: Error, res: request.Response) {
        expect(res.body.data.players[1].userID).toEqual(payload.userID);
        expect(res.statusCode).toEqual(200);
        if (err) return done(err);
        done();
      })
  });

  it('doesn\'t add userID if it already exists on one of the players', async function () {
    const game = await gameQueries.getByUUID(gameID);
    let totalPlayersWithUserID = game.players.reduce((acc: number, player: {[userID: string]: string | null}) => {
      if (player.userID) {
        return acc + 1;
      }
      return acc;
    }, 0);

    expect(totalPlayersWithUserID).toEqual(1);
    

    const existingUserID = game.players[0].userID;

    request(app)
      .patch(`/api/game/${gameID}`)
      .send({userID: existingUserID})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err: Error, res: request.Response) {
        expect(res.statusCode).toEqual(200);
        totalPlayersWithUserID = res.body.data.players.reduce((acc: number, player: {[userID: string]: string | null}) => {
          if (player.userID) {
            return acc + 1;
          }
          return acc;
        }, 0);
        expect(totalPlayersWithUserID).toEqual(1);
      })
  });

  it('returns a 500 error if every player already has a userID', function (done) {
    const payload = {
      userID: "ID"
    };

    request(app)
      .patch(`/api/game/${fullGameID}`)
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err: Error, res: request.Response) {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('No more available players');
        if (err) return done(err);
        done();
      })
  });

  it('returns a 404 error if gameUUID doesn\'t exist', function (done) {
    const invalidGameUUID = '-';
    const payload = {
      userID: "ID"
    };

    request(app)
      .patch(`/api/game/${invalidGameUUID}`)
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err: Error, res: request.Response) {
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual(`No game found with uuid ${invalidGameUUID}`);
        if (err) return done(err);
        done();
      })
  });
});