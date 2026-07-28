import express from 'express';
import { UsersController } from './users.controller';
import { DashboardController } from './dashboard.controller';
import { authMiddleware, adminMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/admin/dashboard', authMiddleware, adminMiddleware, DashboardController.getDashboardData);

router.get('/admin/users', authMiddleware, adminMiddleware, UsersController.getAll);
router.get('/admin/users/:id', authMiddleware, adminMiddleware, UsersController.getById);
router.put('/admin/users/:id', authMiddleware, adminMiddleware, UsersController.update);
router.delete('/admin/users/:id', authMiddleware, adminMiddleware, UsersController.delete);
router.patch('/admin/users/:id/status', authMiddleware, adminMiddleware, UsersController.toggleStatus);
router.patch('/admin/users/:id/role', authMiddleware, adminMiddleware, UsersController.changeRole);

export default router;
