import express from 'express';
import { ChatController } from './chat.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/chat', ChatController.createChat);
router.get('/chat', ChatController.getUserChats);
router.get('/chat/:id', ChatController.getChatById);
router.post('/chat/:chatId/message', ChatController.sendMessage);
router.delete('/chat/:id', ChatController.deleteChat);
router.put('/chat/:id/title', ChatController.updateTitle);

export default router;
