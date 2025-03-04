import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@rawrawtickets/common';

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY must be defined');
}

export { app };
