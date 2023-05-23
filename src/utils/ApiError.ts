import { HttpStatusCodes } from '../constants';

/**
 * Custom Error class which extends the default Error.Uesful for passing error messagw along with status code to the end user.The Default Error can only accept one argument that is the error message.This extended AppError accepts 2 arguments
 * @param {string} message The error message to send as reponse
 * @param {HttpStatus} status The HttpStatus Code for the response
 */

export class ApiError extends Error {
  statusCode: HttpStatusCodes;
  status: string;

  constructor(message: string, statusCode: HttpStatusCodes) {
    super(message);
    this.statusCode = statusCode;

    // setting status as failed for all statuscode starting with 4 and rest as error
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}
