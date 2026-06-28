import express from 'express';
import { UsersController } from './users.controller';
import { authMiddleware, adminMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, UsersController.getAll);
router.get('/users/:id', authMiddleware, adminMiddleware, UsersController.getById);
router.put('/users/:id', authMiddleware, adminMiddleware, UsersController.update);
router.delete('/users/:id', authMiddleware, adminMiddleware, UsersController.delete);
router.patch('/users/:id/status', authMiddleware, adminMiddleware, UsersController.toggleStatus);
router.patch('/users/:id/role', authMiddleware, adminMiddleware, UsersController.changeRole);

export default router;
