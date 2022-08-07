import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'express-async-errors';

import { currentUserRouter } from './routes/current-user';
import { signUpRouter } from './routes/signup';
import { signOutRouter } from './routes/signout';
import { signInRouter } from './routes/signin';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be define');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('auth connected to its database');
  } catch (err) {
    console.log('error', err);
  }
  app.listen(4000, () => {
    console.log('Auth listens on port 4000!');
  });
};

startServer();
