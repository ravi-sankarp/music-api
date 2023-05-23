import { NextFunction, Request, Response } from 'express';

/**
 * Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
 * @param {Function} fn The Express routes function
 * @returns {Function}
 */

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

