import { NextFunction, Request, Response } from 'express';
import { ExpressControllerFn } from '../types/types';

/**
 * Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
 * @param {Function} fn The Express routes function
 * @returns {Function}
 */

export const asyncHandler =
  (fn: ExpressControllerFn) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
