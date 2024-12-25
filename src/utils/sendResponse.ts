import { Response } from 'express';
import { HttpStatusCodes } from '../common/constants';

interface ReponseObj {
  status: HttpStatusCodes;
  data: null | object;
  message: string;
  error?: null;
}

export const sendResponse = (
  res: Response,
  { status, message, data = null, error = null }: ReponseObj
) => {
  res.status(status).json({
    status,
    data,
    message,
    error
  });
};
