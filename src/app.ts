import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import albumRouter from './routes/albums';
import artistsRouter from './routes/artists';
import tracksRouter from './routes/tracks';
import favouritesRouter from './routes/favourites';
import { ApiError } from './utils';
import { errorHandler } from './middlewares';
import { HTTP_STATUS_CODES } from './common/constants';

const app = express();

app.disable('x-powered-by');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setting up the api routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/artists', artistsRouter);
app.use('/api/v1/albums', albumRouter);
app.use('/api/v1/tracks', tracksRouter);
app.use('/api/v1/favorites', favouritesRouter);
app.use('/api/v1', authRouter);

// catch 404 and forward to error handler
app.all('*', (req) => {
  throw new ApiError(`Can't find ${req.originalUrl} on this server!`, HTTP_STATUS_CODES.NOT_FOUND);
});

// global error handler middleware
app.use(errorHandler);

export default app;
