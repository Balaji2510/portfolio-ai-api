import { Response } from 'express';
import { ChatService } from './chat.service';
import { asyncHandler } from '../../middleware/error.middleware';
import { AuthRequest } from '../../middleware/auth.middleware';
import Analytics from '../../models/analytics.model';

const chatService = new ChatService();

export class ChatController {
  static createChat = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title } = req.body;
    const chat = await chatService.createChat(req.userId || undefined, title);

    // Track analytics
    await Analytics.findOneAndUpdate({}, { $inc: { aiChats: 1 } }, { upsert: true, setDefaultsOnInsert: true });

    res.status(201).json({
      success: true,
      message: 'Chat created successfully',
      data: chat,
    });
  });

  static getUserChats = asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await chatService.getUserChats(req.userId || undefined, page, limit);

    res.status(200).json({
      success: true,
      message: 'Chats retrieved successfully',
      data: result.chats,
      pagination: {
        total: result.total,
        page,
        limit,
        pages: Math.ceil(result.total / limit),
      },
    });
  });

  static getChatById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const chat = await chatService.getChatById(id);

    res.status(200).json({
      success: true,
      message: 'Chat retrieved successfully',
      data: chat,
    });
  });

  static sendMessage = asyncHandler(async (req: AuthRequest, res: Response) => {
    const chatId = Array.isArray(req.params.chatId) ? req.params.chatId[0] : req.params.chatId;
    const { message } = req.body;

    if (!message) {
      res.status(400).json({
        success: false,
        message: 'Message content is required',
      });
      return;
    }

    // Verify chat ownership
    const chat = await chatService.getChatById(chatId);

    // Save user message
    const userMsg = await chatService.addMessage(chatId, 'user', message);

    // Generate assistant response
    const assistantResponse = await chatService.generateResponse(chatId, message);
    const assistantMsg = await chatService.addMessage(chatId, 'assistant', assistantResponse);

    let updatedTitle = chat.title;
    if (!chat.messages || chat.messages.length === 0) {
      updatedTitle = await chatService.generateTitle(message);
      await chatService.updateChatTitle(chatId, updatedTitle);
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        userMessage: userMsg,
        assistantMessage: assistantMsg,
        chatTitle: updatedTitle,
      },
    });
  });

  static deleteChat = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    // Verify ownership
    const chat = await chatService.getChatById(id);

    await chatService.deleteChat(id);

    res.status(200).json({
      success: true,
      message: 'Chat deleted successfully',
    });
  });

  static updateTitle = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { title } = req.body;

    if (!title) {
      res.status(400).json({
        success: false,
        message: 'Title is required',
      });
      return;
    }

    // Verify ownership
    const chat = await chatService.getChatById(id);

    const updatedChat = await chatService.updateChatTitle(id, title);

    res.status(200).json({
      success: true,
      message: 'Chat title updated successfully',
      data: updatedChat,
    });
  });
}
