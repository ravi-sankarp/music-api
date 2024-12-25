import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError, asyncHandler } from '../utils';
import { HTTP_STATUS_CODES } from '../common/constants';

export const validate = (schema: ZodSchema<any>, type: 'body' | 'query' = 'body') => {
  return asyncHandler((req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req[type]);
      req[type] = parsedData;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const error = err.errors[0];
        throw new ApiError(`Bad Request, Reason: ${error.message}`, HTTP_STATUS_CODES.BAD_REQUEST);
      }
      const error = err as Error;
      throw new ApiError(error.message, HTTP_STATUS_CODES.OK);
    }
  });
};
