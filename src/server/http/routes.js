import express from 'express';
import passport from 'passport';
import PassportUniqueToken from 'passport-unique-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import FacebookStrategy from 'passport-facebook';
import User from '../mongodb/model/User';
import ProviderProfile from '../mongodb/model/ProviderProfile';

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new FacebookStrategy.Strategy({
    clientID: '203539499783499',
    clientSecret: 'f6e477f0d32c8f8dc987cc78a09fe73b',
    callbackURL: 'https://localhost:3001/login/facebook/return',
  },
  function (accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    //User.findOrCreate({facebookId: profile.id}).then((err, obj, created) => {
    //  console.log('findOrCreate:', err, obj, created);
    //});
    console.log(null, profile);
    return cb(null, profile);
  }));

passport.use(new FacebookTokenStrategy({
    clientID: '203539499783499',
    clientSecret: 'f6e477f0d32c8f8dc987cc78a09fe73b',
  },
  (accessToken, refreshToken, profile, done) => {
    ProviderProfile.findOrCreate(profile).then(({user, token}) => {
      done(null, {
        auth:user,
        token,
      });
    }).catch((err) => {
      done(err);
    });
  }));

passport.use(new PassportUniqueToken.Strategy({
    tokenHeader: 'x-access-token',
  },
  (token, done) => {
    User.findByToken(token).then((user) => {
      return done(null, user);
    }).catch((err) => {
      return done(err, false);
    });
  }));

router.use((req, res, next) => {
  next();
});

router.post('/version', (req, res) => {
  res.json({version: '1.0.0'});
});

router.post('/user/login', (req, res) => {
  User.findByCredentials(req.body).then((foundUser) => {
    foundUser.generateUserAuth().then(({user, token}) => {
      res.status(200).set('x-access-token', token).send(user);
    });
  }).catch((err) => {
    res.status(401).send({user: null});
  })
});

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

router.get('/auth/user', passport.authenticate('token'), (req, res) => {
  res.status(200).send(req.user);
});

router.post('/auth/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  res.set('x-access-token', req.user.token).send(req.auth);
});

// router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/return',
  passport.authenticate('facebook', {failureRedirect: '/login'}), function (req, res) {
    res.staus(200).send({ok: true});
  });


router.post('/user', (req, res) => {
  const {type, username, password, email} = req.body;
  User.addUser({
    type,
    username,
    password,
    email,
  }).then(({user, token}) => {
    res.header('x-access-token', token)
      .send(user.toJSON());
  });

});

export default router;
