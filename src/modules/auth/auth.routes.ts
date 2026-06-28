import express from 'express';
import { AuthController } from './auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/refresh', AuthController.refreshToken);
router.get('/auth/me', authMiddleware, AuthController.getCurrentUser);
router.post('/auth/logout', authMiddleware, AuthController.logout);

export default router;
