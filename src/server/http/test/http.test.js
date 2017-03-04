import request from 'supertest';
import req from 'request';
import expect from 'expect';
import {ObjectID} from 'mongodb';
import jwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';

import UsertType from '../../../api/types/UserType';
import httpServer from '../server-http';
import AuthService from '../../../api/auth/AuthService';
import User from '../../mongodb/model/User';
import mongodbConnect from '../../mongodb/mongodb-connect';
import {clearDB} from '../../mongodb/model/helpers';

const Browser = require('zombie');

const FBAccessToken = 'EAAC5HjuVFUsBAKGHgESRLJrDXmAAqJM8IvP57CxcqNzB93HKjHCxrgJXiCyNUNIwpJjq6OLZCe1ZBmhvEZAqwLakpwldiIh3pKB4hZBwdaSam7g4UmcQu1YiU9nPQg9ZAbYZC6XxxmzM4vdohpHKZA47RpD1EFL1YkZD'
const FBAppToken = '203539499783499|29qxUlbdyWRmGZj6Mgr2JFbKvqk';

const TwitterAccessToken = '743334099817902080-vDThIIZ5Btqd3JaF7K0VGKNGgJYoanK';


const auth0_client_id = '7IrNQSfkujXdawEECjxt5wl5jRMDIDST';

//  lifecycle
describe('http REST API tests', () => {
  let mongoose;
  let server;
  let app;
  let registeredUser = null;
  let authResponse = null;
  let loggedInUserAccessToken = null;
  const authService = new AuthService.getInstance();
  const userID = new ObjectID();

  const aUser = {
    type: UsertType.guest,
    username: 'Test Name D',
    email: 'leedium@me.com',
    password: 'testpassword',
    fname: 'fname1',
    lname: 'lname1',
  };

  const user = {
    username: 'leedium@me.com',
    password: 'astrongpassword',
    type: 'DB',
  };

  before((done) => {
    let options = {
      method: 'POST',
      url: 'https://tinglebuzz.auth0.com/oauth/token',
      headers: {'content-type': 'application/json'},
      body: '{"client_id":"HUo4DwwNMW1Tu67sUaGjzVXyExRC5QPD","client_secret":"f49yARiHky9n8oQxf1BEi5OyE9jEN__vjqnSF63n19Beo4DQDG0bTFkuVxvgQ8Db","audience":"https://tinglebuzz/api","grant_type":"client_credentials"}'
    };

    console.log('=============================>');
    httpServer().then((http) => {
      app = http.app;
      server = http.server;
      mongodbConnect().then((db) => {
        mongoose = db;
        clearDB().then(() => {
          req(options, (error, response, body) => {
            authResponse = JSON.parse(body);
            done();
          });
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
  //
  // it('/api/* can only be accessed by authenticated user', (done) => {
  //   request(app)
  //     .get('/api/authorized')
  //     .set('authorization', `${authResponse.token_type} ${authResponse.access_token}`)
  //     .end((err, res) => {
  //       expect(res.body.user).toExist();
  //       done();
  //     });
  // });

  // it('Auth0 should invalidate a non existant DB user', (done) => {
  //   authService.login({
  //     username: 'me',
  //     password: 'pass',
  //     type: 'DB',
  //   })
  //     .then((authObj) => {
  //       expect(authObj).toBe(undefined);
  //       done();
  //     })
  //     .catch((err) => {
  //       expect(err).toExist();
  //       done();
  //     });
  // });
  it('/api/* can only be accessed by authenticated user', (done) => {
    request(app)
      .get('/api/authorized')
      .set('authorization', `${authResponse.token_type} ${authResponse.access_token}`)
      .end((err, res) => {
        expect(res.body.user).toExist();
        done();
      });
  });


  // it('Auth0 should signup a user and add to Tinglebuzz db', (done) => {
  //   authService.signup(user)
  //     .then((authObj) => {
  //       request(app)
  //         .set('authorization', `${authResponse.token_type} ${authResponse.access_token}`)
  //         .post('/api/user')
  //         .send(Object.assign(aUser, authObj))
  //         .expect((res) => {
  //           //expect(res.headers['x-access-token']).toExist();
  //           expect(res.body._id).toExist();
  //           expect(res.body.err).toNotExist();
  //           registeredUser = res.body._id ;
  //         })
  //         .end(done);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       expect(true).toBe(false) ;
  //       done();
  //     });
  // });
  it('Auth0 should reject user with invalid access token', (done) => {
    authService.validateUser(authResponse.access_token + '123456789')
      .catch((err) => {
        expect(err).toNotBe(null);
        done();
      });
  });


  it('Auth0 should reject a User that already exists with same email or username', (done) => {
    authService.signup(user)
      .catch((err) => {
        expect(err).toNotBe(null);
        done();
      });
  });

  // it('Auth0 should login db user.', (done) => {
  //   authService.login({
  //     username: 'leedium@me.com',
  //     password: 'astrongpassword' ,
  //     type: 'DB',
  //   })
  //     .then((authObj) => {
  //       expect(authObj).toNotBe(undefined);
  //       done();
  //     })
  //     .catch((err) => {
  //       expect(err).toNotExist();
  //       done();
  //     });
  // });


  it('Auth0 should login User via facebook', (done) => {
    request(app)
      .post('/oauth/social/access_token')
      .send({
        access_token: FBAccessToken,
        connection: 'facebook',
        scope: 'profile email openid',
      })
      .end((err, res) => {
        loggedInUserAccessToken = res.body.access_token;
        expect(res.status).toBe(200);
        done();
      });
  });

  it('Auth0 should accept user with valid access token', (done) => {
    authService.validateUser(loggedInUserAccessToken)
      .then((res) => {
        expect(res).toNotBe(null);
        done();
      });
  });

  it(`Auth0 returns Facebook info with valid access token: ${loggedInUserAccessToken}`, (done) => {
    request(app)
      .get('/api/userinfo')
      .set('authorization', `${authResponse.token_type} ${authResponse.access_token}`)
      .set('access_token', loggedInUserAccessToken)
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toExist();
        done();
      });
  });

  it('Auth0 should login User via Twitter', (done) => {
    request(app)
      .post('/oauth/social/access_token')
      .send({
        access_token: TwitterAccessToken,
        connection: 'twitter',
        scope: 'profile',
      })
      .end((err, res) => {
        loggedInUserAccessToken = res.body.access_token;
        expect(res.status).toBe(200);
        done();
      });
  });

  it(`Auth0 returns Twitter info using valid access token`, (done) => {
    request(app)
      .get('/api/userinfo')
      .set('authorization', `${authResponse.token_type} ${authResponse.access_token}`)
      .set('access_token', loggedInUserAccessToken)
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toExist();
        done();
      });
  });


  it('Auth0 should login User via Database', (done) => {
    authService.login(user)
      .then((res) => {
        loggedInUserAccessToken = res.accessToken;
        expect(res.accessToken).toExist();
        done();
      }).catch((err) => {
         expect(res.accessToken).toExist();
          done();
    });
  });

  it(`Database Userinfo found using access token`, (done) => {
    request(app)
      .get('/api/userinfo')
      .set('authorization', `${authResponse.token_type} ${authResponse.access_token}`)
      .set('access_token', loggedInUserAccessToken)
      .end((err, res) => {
        expect(res.status).toBe(200)
        expect(res.body.name).toExist();
        done();
      });
  });

  it('Server accepts /api /app access with valid access_token', (done) => {
    request(app)
      .get('/api/authorized')
      .set('authorization', `${authResponse.token_type} ${authResponse.access_token}`)
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res).toNotBe(null);
        done();
      });
  });

  it('Server rejects /api /app access with an invalid access_token', (done) => {
    request(app)
      .get('/api/authorized')
      .set('authorization', `${authResponse.token_type} 12345678910`) // invalid auth_token
      .end((err, res) => {
        expect(err).toBe(null);
        done();
      });
  });





  // it('Should find User wih x-access-token header- GET:/user ', (done) => {
  //   if (registeredUser === null) {
  //     expect(registeredUser).toBe(null);
  //     done();
  //     return;
  //   }
  //
  //   User.findById(registeredUser, 'tokens').then((user) => {
  //     request(app)
  //       .get('/user')
  //       .set('x-access-token', user.tokens[0].token)
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body._id).toExist();
  //       })
  //       .end((err, res) => {
  //         if (err) {
  //           throw new Error(err);
  //         }
  //         done();
  //       });
  //   });
  // });

  // it('Should find User wih passport-access-token header- GET:/auth/user ', (done) => {
  //   // if(registeredUser === null){
  //   //   expect(registeredUser).toBe(null);
  //   //   done();
  //   //   return;
  //   // }
  //   // User.findById(registeredUser, 'tokens').then((user) => {
  //   //   request(app)
  //   //     .get('/auth/user')
  //   //     .set('x-access-token', user.tokens[0].token)
  //   //     .end((err, res) => {
  //   //       expect(err).toBe(null);
  //   //       done();
  //   //     });
  //   // });
  //
  //   done();
  //
  // });

  // it('Should reject User wih invalid x-access-token header- GET:/user ', (done) => {
  //   // request(app)
  //   //   .get('/user')
  //   //   .set('x-access-token', '123456')
  //   //   .expect(404)
  //   //   .expect((res) => {
  //   //     expect(res.body._id).toNotExist();
  //   //   })
  //   //   .end((err, res) => {
  //   //     if (err) {
  //   //       throw new Error(err);
  //   //     }
  //   //     done();
  //   //   });
  //
  //
  //   done();
  //
  // });

  // it('Should validate a user on login', (done) => {
  //   request(app)
  //     .post('/user/login')
  //     .send({
  //       usernamePassword: 'test@test.com',
  //       password: 'testpassword',
  //     })
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.headers['x-access-token']).toExist();
  //       expect(res.body).toNotBe(undefined);
  //     })
  //     .end(done);
  // });
  //
  // it('Should invalidate a user on login', (done) => {
  //   request(app)
  //     .post('/user/login')
  //     .send({
  //       email: 'test@test.com',
  //       password: 'testpadjkdjkldjkssword',
  //     })
  //     .expect(401)
  //     .expect((res) => {
  //       expect(res.body.user).toBe(null);
  //     })
  //     .end(done);
  // });

  // it('Should validate a facebook login and return a User', (done) => {
  //   request(app)
  //     .post('/auth/facebook/token')
  //     .set('access_token', FBAccessToken)
  //     .end((err, res) => {
  //       expect(res.body._id).toExist();
  //       expect(res.header['x-access-token']).toExist();
  //       done();
  //     });
  // });


  // it('Should send a BrainTree client token to client', (done) => {
  //   request(app)
  //     .get('/api/payment-client-token')
  //     .expect((res) => {
  //       expect(res.body.clientToken).toExist();
  //     })
  //     .end(done);
  // });
});
