import { Router } from 'express';
import * as albumsController from '../controllers/albums';
import { validate } from '../middlewares/validator';
import { userProtectMiddleware } from '../middlewares/authProtect';
import { albumQuerySchema, albumSchema, albumUpdateSchema } from '../common/validations/albums';
import { idSchema } from '../common/validations/common';

const router = Router();

router.get(
  '/',
  userProtectMiddleware('all'),
  validate(albumQuerySchema, 'query'),
  albumsController.getAllAlbums
);

router.get(
  '/:id',
  userProtectMiddleware('all'),
  validate(idSchema, 'params'),
  albumsController.getAlbumById
);

router.post(
  '/add-album',
  userProtectMiddleware('ADMIN'),
  validate(albumSchema),
  albumsController.createAlbum
);

router.put(
  '/:id',
  userProtectMiddleware(['ADMIN', 'EDITOR']),
  validate(albumUpdateSchema),
  validate(idSchema, 'params'),
  albumsController.updateAlbum
);

router.delete(
  '/:id',
  userProtectMiddleware(['ADMIN', 'EDITOR']),
  validate(idSchema, 'params'),
  albumsController.deleteAlbum
);

export default router;
