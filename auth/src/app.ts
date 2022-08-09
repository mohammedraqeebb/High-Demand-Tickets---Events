import express from 'express';
import bodyParser from 'body-parser';

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
    secure: process.env.NODE_ENV !== 'test',
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

export { app };
