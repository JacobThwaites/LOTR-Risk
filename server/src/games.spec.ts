import request from 'supertest';

require('jest');
const app = require('./index');

let gameId: any;

describe('POST /api/game', function () {
  it('save a game to the database', function (done) {
    const payload = {
      numPlayers: 2,
      players: [
          {
              name: "name1",
              areas: "area1",
              userID: "userID"
          },
          {
              name: "name2",
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
      .end(function(err: Error, res: request.Response) {
        expect(res.body.data.num_players).toEqual(payload.numPlayers);
        expect(res.body.data.players).toHaveLength(2);
        expect(res.body.data.players[0].name).toEqual('name1');
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
      .end(function(err, res) {
        expect(res.body.data.id).toEqual(gameId);
        expect(res.statusCode).toEqual(200);
        if (err) return done(err);
        done();
      })
  });
});
