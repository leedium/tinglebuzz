import request from 'supertest';
import expect from 'expect';
import {ObjectID} from 'mongodb';
import UsertType from '../../../api/types/UserType';
import httpServer from '../server-http';
import User from '../../mongodb/model/User';
import mongodbConnect from '../../mongodb/mongodb-connect';
import {clearDB} from '../../mongodb/model/helpers';

const Browser =  require('zombie');

const FBAccessToken = 'EAAC5HjuVFUsBAKGHgESRLJrDXmAAqJM8IvP57CxcqNzB93HKjHCxrgJXiCyNUNIwpJjq6OLZCe1ZBmhvEZAqwLakpwldiIh3pKB4hZBwdaSam7g4UmcQu1YiU9nPQg9ZAbYZC6XxxmzM4vdohpHKZA47RpD1EFL1YkZD'
const FBAppToken = '203539499783499|29qxUlbdyWRmGZj6Mgr2JFbKvqk'


//  lifecycle
describe('http REST API tests', () => {
  let mongoose;
  let server;
  let app;
  let registeredUser;
  const userID = new ObjectID();

  const aUser = {
    type: UsertType.guest,
    username: 'Test Name D',
    email: 'test@test.com',
    password: 'testpassword',
    fname: 'fname1',
    lname: 'lname1',
  }

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
      .send(aUser)
      .expect((res) => {
        expect(res.headers['x-access-token']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.err).toNotExist();
        registeredUser = res.body._id;
      })
      .end(done);
  });

  it('should reject a User that already exists with same email or username', (done) => {
    request(app)
      .post('/user')
      .send(aUser)
      .expect((res) => {
        expect(res.body.err).toExist();
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
        usernamePassword: 'test@test.com',
        password: 'testpassword',
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-access-token']).toExist();
        expect(res.body).toNotBe(undefined);
      })
      .end(done);
  });

  it('Should invalidate a user on login', (done) => {
    request(app)
      .post('/user/login')
      .send({
        email: 'test@test.com',
        password: 'testpadjkdjkldjkssword',
      })
      .expect(401)
      .expect((res) => {
        expect(res.body.user).toBe(null);
      })
      .end(done);
  });

  it('Should validate a facebook login and return a User', (done) => {
    request(app)
      .post('/auth/facebook/token')
      .set('access_token', FBAccessToken)
      .end((err, res) => {
        expect(res.body._id).toExist();
        expect(res.header['x-access-token']).toExist();
        done();
      });
  });

  it('Should send a BrainTree client token to client', (done) => {
    request(app)
      .get('/payment-client-token')
      .expect((res) => {
        expect(res.body.clientToken).toExist();
      })
      .end(done);
  });
});
