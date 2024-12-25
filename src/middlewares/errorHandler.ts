import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import config from '../config';
import { logger, sendResponse } from '../utils';

/**
 * Custom express error handler for handling all the errors in the application and sending them to the end user
 *
 */
export const errorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // setting status and statuscode if statuscode is empty
  const statusCode = (err instanceof ApiError && err.statusCode) || 500;

  // logging all errors in development stage
  if (config.NODE_ENV === 'development') {
    console.error(err);
  }

  // hiding error details for 500 errors in production
  if (config.NODE_ENV === 'production' && statusCode.toString().startsWith('5')) {
    // logging errors
    logger.error(err?.message, { error: err });

    // sending error reponses
    sendResponse(res, {
      status: statusCode,
      data: null,
      message: 'Something went wrong ! Please try again',
      error: null
    });
    return;
  }

  // sending error message for all other scenarios
  res.status(statusCode).json(
    sendResponse(res, {
      status: statusCode,
      data: null,
      message: err.message,
      error: null
    })
  );
};
