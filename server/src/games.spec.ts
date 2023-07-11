const gameQueries = require("./database/gameQueries");
const app = require('./index');
import { Game } from './gameLogic/Models/Game';
import { Player } from './gameLogic/Models/Player';

import request from 'supertest';
require('jest');

describe('POST /api/game', function () {
  it('save a game to the database', function (done) {
    const userID = 'userID';
    const numPlayers = 2;
    const payload = {
      numPlayers,
      userID
    }

    request(app)
      .post('/api/game')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err: Error, res: request.Response) {
        expect(res.body.data.players).toHaveLength(numPlayers);
        expect(res.body.data.players[0].userID).toEqual(userID);
        expect(res.body.data.uuid).toBeDefined();
        expect(res.statusCode).toEqual(201);
        if (err) return done(err);
        done();
      })
  });

  it('returns a 500 error if numPlayers is less than 2 or greater than 4', function (done) {
    const userID = 'userID';

    request(app)
      .post('/api/game')
      .send({
        numPlayers: 1,
        userID
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function (err: Error, res: request.Response) {
        expect(res.statusCode).toEqual(400);
        if (err) return done(err);
        done();
      })

      request(app)
      .post('/api/game')
      .send({
        numPlayers: 5,
        userID
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function (err: Error, res: request.Response) {
        expect(res.statusCode).toEqual(400);
        if (err) return done(err);
        done();
      })
  });
});

describe('GET /api/game/:gameId', function () {
  it('get game by gameId', function (done) {
    const game: Game = gameQueries.createGame('', 2);
    const gameUUID = game.getUUID();
    request(app)
      .get(`/api/game/${gameUUID}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        console.log(res);
        
        expect(res.body.data.uuid).toEqual(game.getUUID());
        expect(res.statusCode).toEqual(200);
        if (err) return done(err);
        done();
      })
  });
});


describe('PATCH /api/game/:gameId', function () {
  let game: Game;

  beforeEach(async () => {
    game = gameQueries.createGame('userID', 2);
  });

  it('can add a userID to the next available player in a game if there are spaces remaining', function (done) {
    const payload = {
      userID: "ID"
    };

    console.log("asdf");
    console.log(game);
    
    const gameUUID = game.getUUID();
    request(app)
      .patch(`/api/game/${gameUUID}`)
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
    let totalPlayersWithUserID = game.getPlayers().reduce((acc: number, player: Player) => {
      if (player.getUserID()) {
        return acc + 1;
      }
      return acc;
    }, 0);

    expect(totalPlayersWithUserID).toEqual(1);
    

    const existingUserID = game.getPlayers()[0].getUserID();
    const gameUUID = game.getUUID();

    request(app)
      .patch(`/api/game/${gameUUID}`)
      .send({userID: existingUserID})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err: Error, res: request.Response) {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('userID already in game');
        
        totalPlayersWithUserID = res.body.data.players.reduce((acc: number, player: {[userID: string]: string | null}) => {
          if (player.userID) {
            return acc + 1;
          }
          return acc;
        }, 0);
        expect(totalPlayersWithUserID).toEqual(1);
      })
  });

  it('remains unmodified if every player already has a userID', function (done) {
    const payload = {
      userID: "ID"
    };

    const gameUUID = game.getUUID();
    const players = game.getPlayers();
    for (let i = 0; i < players.length; i++) {
      players[i].setUserID(`${i}`);
    }

    request(app)
      .patch(`/api/game/${gameUUID}`)
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function (err: Error, res: request.Response) {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('No more available players');
        if (err) return done(err);
        done();
      })
  });

  it('returns a 404 error if there is no game with the given ID', function (done) {
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