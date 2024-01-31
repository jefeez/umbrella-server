import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authenticated from '../middlewares/authenticated';

const router = Router();

router.post('/sign-in', authController.signin);
router.post('/sign-up', authController.signup);
router.get('/', authenticated, authController.auth);

export default router;
