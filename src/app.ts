import express from 'express';
import morgan from 'morgan';
import apiRoutes from './routes/index.router';
import config from './config';
import { ApiError } from './utils';
import { errorHandler } from './middlewares';
import { HTTP_STATUS_CODES } from './constants';

const app = express();

app.disable('x-powered-by');

// using morgan for development logging
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setting up the api routes
app.use('/api/v1', apiRoutes);

// catch 404 and forward to error handler
app.all('*', (req) => {
  throw new ApiError(`Can't find ${req.originalUrl} on this server!`, HTTP_STATUS_CODES.NOT_FOUND);
});

// global error handler middleware
app.use(errorHandler);

export default app;
