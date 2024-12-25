import { Response, Request } from 'express';
import { asyncHandler, sendResponse } from '../utils';
import { HTTP_STATUS_CODES, RESPONSES, RoleToStringMap } from '../common/constants';
import { UserLogin, UserSignup } from '../common/validations/users';
import { createUserAndTenantUser, getTenantUserByUserId, getUserByEmail } from '../db/users';
import { comparePassword, hashPassword } from '../helpers/password';
import { createSession, revokeSession } from '../helpers';
import { AuthenticatedRequest } from '../types/interfaces';
import { UniqueConstraintError } from 'sequelize';

export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as UserLogin;
  const result = await getUserByEmail(email);
  if (!result) {
    sendResponse(res, {
      message: RESPONSES.USER_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }
  const passwordCheckResult = await comparePassword(password, result.password);
  if (!passwordCheckResult) {
    sendResponse(res, {
      message: RESPONSES.USER_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }
  const tenantUser = await getTenantUserByUserId(result.dataValues.user_id);
  if (!tenantUser) {
    sendResponse(res, {
      message: RESPONSES.USER_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }
  const { accessToken } = await createSession({
    tenant_id: tenantUser.dataValues.tenant_id,
    role: RoleToStringMap[tenantUser.role_id],
    user_id: result.dataValues.user_id
  });
  sendResponse(res, {
    message: RESPONSES.LOGIN_SUCCESSFUL,
    status: HTTP_STATUS_CODES.OK,
    data: {
      token: accessToken
    }
  });
});

export const userSignup = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserSignup;
    const hashPwd = await hashPassword(password);
    await createUserAndTenantUser({ email, password: hashPwd, role: 'ADMIN' });
    sendResponse(res, {
      message: RESPONSES.USER_CREATED_SUCCESSFULLY,
      status: HTTP_STATUS_CODES.OK,
      data: null
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      sendResponse(res, {
        message: RESPONSES.EMAIL_ALREADY_EXISTS,
        status: HTTP_STATUS_CODES.CONFLICT,
        data: null
      });
      return;
    }
    throw err;
  }
});

export const userLogout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await revokeSession(req.token.sessionHandle);
  sendResponse(res, {
    message: RESPONSES.USER_LOGGED_OUT_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});
