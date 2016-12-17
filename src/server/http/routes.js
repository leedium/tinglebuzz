import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.post('/login', (req, res) => {
  res.json({ ok: true });
});

export default router;
