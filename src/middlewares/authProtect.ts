import { Response, NextFunction } from 'express';
import { ApiError, asyncHandler } from '../utils';
import { HTTP_STATUS_CODES, RESPONSES, RoleToIdMap } from '../common/constants';
import { validateSession } from '../helpers';
import { AuthenticatedRequest } from '../types/interfaces';

//  middleware for checking if user is authorized

export const userProtectMiddleware = (
  role: keyof typeof RoleToIdMap | 'all' | (keyof typeof RoleToIdMap)[]
) => {
  return asyncHandler(async (req: AuthenticatedRequest, res: Response, next?: NextFunction) => {
    let token: string | undefined;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        throw new ApiError(RESPONSES.UNAUTHORIZED_ACCESS, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      // verify token
      const decodedToken = await validateSession(token);
      if (role !== 'all') {
        // check if user has the correct permission to access this route
        if (Array.isArray(role)) {
          const isValid = role.find((value) => value === decodedToken.role);
          if (!isValid) {
            throw new ApiError(RESPONSES.FORBIDDEN_ACCESS, HTTP_STATUS_CODES.FORBIDDEN);
          }
        } else if (decodedToken.role !== role) {
          throw new ApiError(RESPONSES.FORBIDDEN_ACCESS, HTTP_STATUS_CODES.FORBIDDEN);
        }
      }
      req.token = decodedToken;

      if (next) {
        next();
      }
    } else {
      throw new ApiError(RESPONSES.UNAUTHORIZED_ACCESS, HTTP_STATUS_CODES.UNAUTHORIZED);
    }
  });
};
