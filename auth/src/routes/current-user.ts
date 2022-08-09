import express from 'express';
const router = express.Router();

import { currentUser } from './../middlewares/current-user';

router.get('/api/users/currentuser', currentUser, (req, res) => {
  const currentUser = req.currentUser || null;
  res.send({ currentUser });
});

export { router as currentUserRouter };
