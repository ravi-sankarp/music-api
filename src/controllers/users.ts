import { Response } from 'express';
import { asyncHandler, sendResponse } from '../utils';
import { HTTP_STATUS_CODES, RESPONSES } from '../common/constants';
import { UsersFilters } from '../common/validations/filters';
import {
  createUserAndTenantUser,
  deleteTenantUser,
  getUserById,
  getUsersByTenantId,
  updateUserPasswordById
} from '../db/users';
import { AuthenticatedRequest } from '../types/interfaces';
import { comparePassword, hashPassword } from '../helpers';
import { UniqueConstraintError } from 'sequelize';
import { PasswordChange, UserSignupWithRole } from '../common/validations/users';
import { IdType } from '../common/validations/common';

export const getAllUsers = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const filters = req.query as unknown as UsersFilters;
  const users = await getUsersByTenantId(req.token.tenant_id, req.token.user_id, filters);
  sendResponse(res, {
    message: RESPONSES.USERS_RETRIEVED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: users
  });
});

export const createUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password, role } = req.body as UserSignupWithRole;
    const hashPwd = await hashPassword(password);
    await createUserAndTenantUser({
      email,
      password: hashPwd,
      role,
      tenantId: req.token.tenant_id,
      createdBy: req.token.user_id
    });
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

export const deleteUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: userId } = req.params as IdType;

  if (userId === req.token.user_id) {
    sendResponse(res, {
      message: RESPONSES.BAD_REQUEST,
      status: HTTP_STATUS_CODES.BAD_REQUEST,
      data: null
    });
    return;
  }
  await deleteTenantUser(userId, req.token.tenant_id);
  sendResponse(res, {
    message: RESPONSES.USER_DELETED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});

export const updateUserPasword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.token.user_id;
  const user = await getUserById(userId);
  if (!user) {
    sendResponse(res, {
      message: RESPONSES.USER_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }
  const { new_password, old_password } = req.body as PasswordChange;

  const passwordCheckResult = await comparePassword(old_password, user.dataValues.password);
  if (!passwordCheckResult) {
    sendResponse(res, {
      message: RESPONSES.USER_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }
  const hashPwd = await hashPassword(new_password);
  await updateUserPasswordById(userId, hashPwd);
  res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
});
