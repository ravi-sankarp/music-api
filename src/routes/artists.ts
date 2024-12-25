import { Router } from 'express';
import * as artistController from '../controllers/artists';
import { validate } from '../middlewares/validator';
import { userProtectMiddleware } from '../middlewares/authProtect';
import { artistQuerySchema, artistSchema, artistUpdateSchema } from '../common/validations/artists';
import { idSchema } from '../common/validations/common';

const router = Router();

router.get(
  '/',
  userProtectMiddleware('all'),
  validate(artistQuerySchema, 'query'),
  artistController.getAllArtists
);

router.get(
  '/:id',
  userProtectMiddleware('all'),
  validate(idSchema, 'params'),
  artistController.getArtistById
);

router.post(
  '/add-artist',
  userProtectMiddleware('ADMIN'),
  validate(artistSchema),
  artistController.createArtist
);

router.put(
  '/:id',
  userProtectMiddleware(['ADMIN', 'EDITOR']),
  validate(artistUpdateSchema),
  validate(idSchema, 'params'),
  artistController.updateArtist
);

router.delete(
  '/:id',
  userProtectMiddleware(['ADMIN', 'EDITOR']),
  validate(idSchema, 'params'),
  artistController.deleteArtist
);

export default router;
