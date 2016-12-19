import request from 'supertest';
import expect from 'expect';
import {ObjectID} from 'mongodb';

import httpServer from '../server-http';
import mongodbConnect from '../../mongodb/mongodb-connect';
import { clearDB } from '../../mongodb/model/helpers';

//  lifecycle
describe('http REST API tests', () => {
  let mongoose;
  let server;
  let app;
  let registeredUser;
  const userID = new ObjectID();

  before((done) => {
    console.log('=============================>');
    httpServer().then((http) => {
      app = http.app;
      server = http.server;
      mongodbConnect().then((db) => {
        mongoose = db;
        clearDB().then((res) => {
          done();
        });
      });
    });
  });

  after((done) => {
    clearDB().then((res) => {
      mongoose.connection.close();
      server.close();
      done();
    });
  });

  it('addUser wih x-access-token header- POST:/user ', (done) => {
    request(app)
      .post('/user')
      .send({
        username: 'Test Name',
        email: 'test@test.com',
        password: 'test password',
      })
      .end((err, res) => {
        expect(res.headers['x-access-token']).toExist();
        expect(res.body._id).toExist();
        done();
      });
  });
});
