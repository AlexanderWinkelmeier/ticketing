import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@rawrawtickets/common';
import { deleteOrderRouter } from './routes/delete';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // verschlüsselt
    signed: false,
    // https
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY must be defined');
}

export { app };
