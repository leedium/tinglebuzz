import request from 'supertest';
import expect from 'expect';
import { ObjectID } from 'mongodb';

import httpServer from '../server-http';
import mongodbConnect from '../../mongodb/mongodb-connect';
import UserType from '../../../api/types/UserType';
import { addUser } from '../../../api/user-api';

//  lifecycle
describe('http REST API tests', () => {
  let mongoose;
  let server;
  let app;
  let registeredUser;
  const userID = new ObjectID();

  before((done) => {
      httpServer().then((http) => {
        app = http.app;
        server = http.server;
        mongodbConnect().then((db) => {
          mongoose = db;
          addUser({
            _id: userID,
            type: UserType.business,
            email: 'leedium@poo.com',
            password: '362y32hjh3',
            username: 'leedium2233',
            fname: 'David',
            lname: 'Lee',
          }).then(({ user }) => {
            registeredUser = user;
            done();
          });
        });
      });
  });

  after((done) => {
    mongoose.connection.close();
    server.close();
    done();
  });

  it('addUser - POST:/user ', (done) => {
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
