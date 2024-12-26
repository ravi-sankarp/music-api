import { Router } from 'express';
import * as favoritesController from '../controllers/favorites';
import { validate } from '../middlewares/validator';
import { userProtectMiddleware } from '../middlewares/authProtect';
import { idSchema } from '../common/validations/common';
import {
  addFavoriteSchema,
  favoriteCategorySchema,
  favoritesQuerySchema
} from '../common/validations/favorites';

const router = Router();

router.get(
  '/:category',
  userProtectMiddleware('all'),
  validate(favoritesQuerySchema, 'query'),
  validate(favoriteCategorySchema, 'params'),
  favoritesController.getFavorites
);

router.post(
  '/add-favorite',
  userProtectMiddleware('all'),
  validate(addFavoriteSchema),
  favoritesController.addFavorite
);

router.delete(
  '/remove-favorite/:id',
  userProtectMiddleware('all'),
  validate(idSchema, 'params'),
  favoritesController.removeFavorite
);

export default router;
