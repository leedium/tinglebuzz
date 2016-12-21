import express from 'express';
import passport from 'passport';
import passportUniqueToken from 'passport-unique-token';
import User from '../mongodb/model/User';

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new passportUniqueToken.Strategy({
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
  User.findByCredentials(req.body).then((user) => {
    res.status(200).send(user);
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
