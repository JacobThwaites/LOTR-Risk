import request from 'supertest';

require('jest');
const app = require('./index');

let uuid: any;

describe('GET /', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /api/game', function () {
  it('save a game to the database', function (done) {
    const payload = {
      numPlayers: 4,
      player1Areas: 'area1',
      player2Areas: 'area2',
      player3Areas: 'area3',
      player4Areas: 'area4',
    }

    request(app)
      .post('/api/game')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err: Error, res: request.Response) {
        expect(res.body.data.numPlayers).toEqual(payload.numPlayers);
        expect(res.body.data.player1Areas).toEqual(payload.player1Areas);
        expect(res.body.data.player2Areas).toEqual(payload.player2Areas);
        expect(res.body.data.player3Areas).toEqual(payload.player3Areas);
        expect(res.body.data.player4Areas).toEqual(payload.player4Areas);
        uuid = res.body.data.uuid;
        expect(res.statusCode).toEqual(201);
        if (err) return done(err);
        done();
      })
  });
});

describe('GET /api/game/:uuid', function () {
  it('get game by UUID', function (done) {
    request(app)
      .get(`/api/game/${uuid}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body.data.uuid).toEqual(uuid);
        expect(res.statusCode).toEqual(200);
        if (err) return done(err);
        done();
      })
  });
});
