import express from 'express';
import braintree from 'braintree';
import superagent from 'superagent';
import jwt from 'express-jwt';
import passport from 'passport';
import PassportUniqueToken from 'passport-unique-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import FacebookStrategy from 'passport-facebook';

import User from '../mongodb/model/User';
import ProviderProfile from '../mongodb/model/ProviderProfile';

const router = express.Router();

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'bc8gdz3g38wwx7nv',
  publicKey: '6vwkfbmrtktzjf5q',
  privateKey: '08e4b2ebf8f4f77874ef9855a13afde7',
});

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
//
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
//
// passport.use(new FacebookStrategy.Strategy({
//   clientID: '203539499783499',
//   clientSecret: 'f6e477f0d32c8f8dc987cc78a09fe73b',
//   callbackURL: 'https://localhost:3001/login/facebook/return',
// }, (accessToken, refreshToken, profile, cb) =>
//   //  In this example, the user's Facebook profile is supplied as the user
//   //  record.  In a production-quality application, the Facebook profile should
//   //  be associated with a user record in the application's database, which
//   //  allows for account linking and authentication with other identity
//   //  providers.
//   //  User.findOrCreate({facebookId: profile.id}).then((err, obj, created) => {
//   //  console.log('findOrCreate:', err, obj, created);
//   //  });
//   cb(null, profile)));

// passport.use(new FacebookTokenStrategy({
//   clientID: '203539499783499',
//   clientSecret: 'f6e477f0d32c8f8dc987cc78a09fe73b',
// }, (accessToken, refreshToken, profile, done) => {
//   ProviderProfile.findOrCreate(profile).then(({user, token}) => {
//     done(null, {
//       user,
//       token,
//     });
//   }).catch((err) => {
//     done(err);
//   });
// }));
//
// passport.use(new PassportUniqueToken.Strategy({
//   tokenHeader: 'x-access-token',
// }, (token, done) => {
//   User.findByToken(token)
//     .then(user => done(null, user))
//     .catch(err => done(err, false));
// }));


router.post('/version', (req, res) => {
  res.json({version: '1.0.0'});
});

// router.post('/user/login', (req, res) => {
//   User.findByCredentials(req.body).then((foundUser) => {
//     foundUser.generateUserAuth().then(({user, token}) => {
//       res.status(200).set('x-access-token', token).send(user);
//     });
//   }).catch((err) => {
//     res.status(401).send(err);
//   });
// });

router.get('/user', (req, res) => {
  User.findByToken(req.headers['x-access-token']).then((user) => {
    res
      .status(200)
      .send(user);
  }).catch((err) => {
    res
      .status(404)
      .send(err);
  });
});

router.get('/api/authorized', (req, res) => {
  res.status(200).send({user:req.user});
});

router.post('/api/user', (req, res) => {
  const {type, username, auth0Id} = req.body;
  User.addUser({
    auth0Id,
    type,
    username,
    // password,
    // email,
  }).then(({user, token}) => {
    res.header('x-access-token', token)
      .send(user.toJSON());
  }).catch((err) => {
    res.send({
      err: {
        code: err.code,
        message: err.errmsg,
      },
    });
  });
});

//  Facebook Auth
// router.get('/auth/user', passport.authenticate('token'), (req, res) => {
//   res.status(200).send(req.user);
// });

//  0Auth
router.post('/oauth/access_token', (req, res) => {
  superagent
    .post('https://tinglebuzz.auth0.com/oauth/access_token')
    .send({
      client_id: 'HUo4DwwNMW1Tu67sUaGjzVXyExRC5QPD',
      client_secret: '92SII7LMv3NhIfG7p6yNHUzBTlDBmAPZMmuY5D_THiAh1zM8gQYGYc68pge71ein',
      access_token: req.body.access_token,
      connection: 'facebook',
      scope: 'openid profile email',
    })
    .end((err, response) => {
      if (err) {
        res.status(err.status);
        return;
      }
      res.status(200).set({
        'set-cookie': response.get('set-cookie'),
      }).send(response.body);
    });
});
//
// router.post('/auth/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
//   res.set('x-access-token', req.user.token).send(req.user.user.toJSON());
// });

// router.get('/login/facebook/return',
//   passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
//     res.stauts(200).send({ok: true});
//   });

//  BrainTree Auth
router.get('/payment-client-token',(req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.send({success: false});
    }
    res.send(response);
  });
});

export default router;
