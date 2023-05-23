import { Router } from 'express';
import adminController from '../controllers/index.controller';

const router = Router();

router.get('/', adminController.getRoute);

export default router;
