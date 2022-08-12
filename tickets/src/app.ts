import express from 'express';
import bodyParser from 'body-parser';

import 'express-async-errors';
import {
  errorHandler,
  NotFoundError,
  currentUser,
  requireAuth,
} from '@high-demand-ticket/common';
import { createTicketRouter } from './routes/new';
import cookieSession from 'cookie-session';
import { showTicketRouter } from './routes/show';
import { getAllTicketsRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(getAllTicketsRouter);
app.use(updateTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
