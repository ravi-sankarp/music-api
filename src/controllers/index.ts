import { Response, Request } from 'express';
import { asyncHandler, sendResponse } from '../utils';
import { HTTP_STATUS_CODES } from '../constants';

export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  sendResponse(res, {
    message: 'Success',
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});
