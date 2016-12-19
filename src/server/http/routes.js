import express from 'express';
import passport from 'passport';
import passportUniqueToken from 'passport-unique-token';
import User from '../mongodb/model/User';

const router = express.Router();

passport.use(new passportUniqueToken({
    tokenHeader: 'x-access-token'
  },
  (token, done) => {

  }));

router.use((req, res, next) => {
  next();
});

router.post('/version', (req, res) => {
  res.json({version: '1.0.0'});
});

router.get('/user', (req, res) => {
  User.findByToken(req.headers['x-access-token']).then((user) => {
    res
      .status(200)
      .send(user);
  }).catch((err) => {
    res
      .status(404)
      .send(null);
  });
});

router.get('/auth/user', passportUniqueToken)

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
