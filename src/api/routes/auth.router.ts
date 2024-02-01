import { Router } from 'express';
import multer from 'multer';

import authController from '../controllers/auth.controller';
import authenticated from '../middlewares/authenticated';

const router = Router();
const uploader = multer();
router.post('/sign-in', authController.signin);
router.post('/sign-up', authController.signup);
router.get('/', authenticated, authController.auth);
router.put('/avatar', authenticated, uploader.single('avatar'), authController.avatar);
// router.get('/socket', (req, res) => {
//   const io = req.io as Server;
//   io.emit('request', 'body');
//   res.status(200).json('socket');
// });
export default router;
