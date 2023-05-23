import { Response } from 'express';
import { HttpStatusCodes } from '../constants';

/**
 * Simple function to send Api response to the client in an ordered manner
 */

export const sendResponse = (res: Response, data: any, statusCode: HttpStatusCodes = 200) => {
  res.status(statusCode).json({
    status: 'success',
    data
  });
};
