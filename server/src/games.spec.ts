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
      numPlayers: 2,
      players: [
          {
              name: "name1",
              areas: "area1"
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
