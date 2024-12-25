import { Request } from 'express';

export interface JwtPayload {
  sessionHandle: string;
  refreshTokenHash1: string;
  parentRefreshTokenHash1: any;
  antiCsrfToken: any;
  user_id: string;
  role: string;
  iss: string;
}

export interface AuthenticatedRequest extends Request {
  token: JwtPayload;
}
