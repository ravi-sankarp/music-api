import { Router } from 'express';
import * as trackController from '../controllers/tracks';
import { validate } from '../middlewares/validator';
import { userProtectMiddleware } from '../middlewares/authProtect';
import { trackQuerySchema, trackSchema, trackUpdateSchema } from '../common/validations/tracks';
import { idSchema } from '../common/validations/common';

const router = Router();

router.get(
  '/',
  userProtectMiddleware('all'),
  validate(trackQuerySchema, 'query'),
  trackController.getAllTracks
);

router.get(
  '/:id',
  userProtectMiddleware('all'),
  validate(idSchema, 'params'),
  trackController.getTrackById
);

router.post(
  '/add-track',
  userProtectMiddleware('ADMIN'),
  validate(trackSchema),
  trackController.createTrack
);

router.put(
  '/:id',
  userProtectMiddleware(['ADMIN', 'EDITOR']),
  validate(trackUpdateSchema),
  validate(idSchema, 'params'),
  trackController.updateTrack
);

router.delete(
  '/:id',
  userProtectMiddleware(['ADMIN', 'EDITOR']),
  validate(idSchema, 'params'),
  trackController.deleteTrack
);

export default router;
