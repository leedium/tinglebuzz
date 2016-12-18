import express from 'express';
import { addUser } from '../../api/user-api';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.post('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

router.post('/user', (req, res) => {
  const { type, username, password, email } = req.body;
  addUser({
    type,
    username,
    password,
    email,
  }).then(({ user, token }) => {
    res.header('x-access-token', token)
      .send(user.toJSON());
  });

});

export default router;
