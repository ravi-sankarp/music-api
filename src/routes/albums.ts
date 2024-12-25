import { Router } from 'express';
import * as authController from '../controllers/auth';
import { validate } from '../middlewares/validator';
import { userLoginSchema, userSignupSchema } from '../common/validations/users';
import { userProtectMiddleware } from '../middlewares/authProtect';

const router = Router();

router.post('login', validate(userLoginSchema), authController.userLogin);

router.post('signup', validate(userSignupSchema), authController.userSignup);

router.get('logout', userProtectMiddleware('all'), authController.userLogout);

export default router;
