import { Router } from 'express';
import * as userController from '../controllers/users';
import { validate } from '../middlewares/validator';
import { passwordChangeSchema, userSignupWithRoleSchema } from '../common/validations/users';
import { userProtectMiddleware } from '../middlewares/authProtect';
import { usersFilterSchema } from '../common/validations/filters';
import { idSchema } from '../common/validations/common';

const router = Router();

router.get(
  '/',
  userProtectMiddleware('ADMIN'),
  validate(usersFilterSchema, 'query'),
  userController.getAllUsers
);

router.post(
  '/add-user',
  userProtectMiddleware('ADMIN'),
  validate(userSignupWithRoleSchema),
  userController.createUser
);

router.put(
  '/update-password',
  userProtectMiddleware('all'),
  validate(passwordChangeSchema),
  userController.updateUserPasword
);

router.delete(
  '/:id',
  userProtectMiddleware('ADMIN'),
  validate(idSchema, 'params'),
  userController.deleteUser
);

export default router;
