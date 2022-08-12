import express from 'express';
const router = express.Router();

import { currentUser } from '@high-demand-ticket/common';

router.get('/api/users/currentuser', currentUser, (req, res) => {
  const currentUser = req.currentUser || null;
  res.send({ currentUser });
});

export { router as currentUserRouter };
