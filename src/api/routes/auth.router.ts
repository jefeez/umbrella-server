import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/sign-in', authController.signin);
router.post('/sign-up', authController.signup);

export default router;
