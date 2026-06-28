import express from 'express';
import { ContactController } from './contact.controller';
import { authMiddleware, adminMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/contact', ContactController.submit);
router.get('/contact', authMiddleware, adminMiddleware, ContactController.getAll);
router.get('/contact/:id', authMiddleware, adminMiddleware, ContactController.getById);
router.patch('/contact/:id/read', authMiddleware, adminMiddleware, ContactController.markAsRead);
router.post('/contact/:id/reply', authMiddleware, adminMiddleware, ContactController.reply);
router.delete('/contact/:id', authMiddleware, adminMiddleware, ContactController.delete);

export default router;
