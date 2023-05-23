import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import config from '../config';

/**
 * Custom express error handler for handling all the errors in the application and sending them to the end user
 *
 */
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  // setting status and statuscode if statuscode is empty
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? 'error';

  // logging all errors in development stage
  if (config.NODE_ENV === 'development') {
    console.error({ error: err.message, stack: err.stack });
  }

  // hiding error details for 500 errors in production
  if (config.NODE_ENV === 'production' && err.statusCode.toString().startsWith('5')) {
    // logging errors
    console.log(err);
    // sending error reponses
    res.status(err.statusCode).json({
      status: 'error',
      message: 'Something went wrong ! Please try again'
    });
    return;
  }

  // sending error message for all other scenarios
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
