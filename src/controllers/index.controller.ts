import { Response, Request } from 'express';
import { asyncHandler, sendResponse } from '../utils';
import * as indexService from '../services/index.service';

export default {
  getRoute: asyncHandler(async (req: Request, res: Response) => {
    const data = indexService.getData();
    sendResponse(res, data);
  })
};
