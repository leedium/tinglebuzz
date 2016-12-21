import request from 'supertest';
import expect from 'expect';
import {ObjectID} from 'mongodb';

import UsertType from '../../../api/types/UserType'
import httpServer from '../server-http';
import User from '../../mongodb/model/User';
import mongodbConnect from '../../mongodb/mongodb-connect';
import {clearDB} from '../../mongodb/model/helpers';

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
        clearDB().then(() => {
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

  it('Should addUser POST:/user ', (done) => {
    request(app)
      .post('/user')
      .send({
        type: UsertType.guest,
        username: 'Test Name',
        email: 'test@test.com',
        password: 'test password',
        fname: 'fname1',
        lname: 'lname1',
      })
      .expect((res) => {
        expect(res.headers['x-access-token']).toExist();
        expect(res.body._id).toExist();
        registeredUser = res.body._id;
      })
      .end(done);
  });

  it('Should find User wih x-access-token header- GET:/user ', (done) => {
    User.findById(registeredUser, 'tokens').then((user) => {
      request(app)
        .get('/user')
        .set('x-access-token', user.tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toExist();
        })
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }
          done();
        });
    });
  });

  it('Should find User wih passport-access-token header- GET:/auth/user ', (done) => {
    User.findById(registeredUser, 'tokens').then((user) => {
      request(app)
        .get('/auth/user')
        .set('x-access-token', user.tokens[0].token)
        .end((err, res) => {
          expect(err).toBe(null);
          done();
        });
    });
  });

  it('Should reject User wih invalid x-access-token header- GET:/user ', (done) => {
    request(app)
      .get('/user')
      .set('x-access-token', '123456')
      .expect(404)
      .expect((res) => {
        expect(res.body._id).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        done();
      });
  });

  it('Should validate a user on login', (done) => {
    request(app)
      .post('/user/login')
      .send({
        email: 'test@test.com',
        password: 'test2',
      })
      .expect(200)
      .expect((res) => {
        //console.log(res.body)
      })
      .end(done)
  });
});
