import express from 'express';
import { ChatController } from './chat.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/chat', authMiddleware, ChatController.createChat);
router.get('/chat', authMiddleware, ChatController.getUserChats);
router.get('/chat/:id', authMiddleware, ChatController.getChatById);
router.post('/chat/:chatId/message', authMiddleware, ChatController.sendMessage);
router.delete('/chat/:id', authMiddleware, ChatController.deleteChat);
router.put('/chat/:id/title', authMiddleware, ChatController.updateTitle);

export default router;
