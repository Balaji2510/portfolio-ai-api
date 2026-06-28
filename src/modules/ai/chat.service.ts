import Chat from '../../models/chat.model';
import Message from '../../models/message.model';
import { IChat } from '../../models/chat.model';
import { IMessage } from '../../models/message.model';
import { Types } from 'mongoose';

export class ChatService {
  async createChat(userId: string, title?: string): Promise<IChat> {
    const chatData: any = {
      userId: new Types.ObjectId(userId),
      title: title || 'New Chat',
      sessionId: Date.now().toString(),
    };
    const chat = await Chat.create(chatData);

    return chat;
  }

  async getUserChats(userId: string, page: number = 1, limit: number = 20): Promise<{ chats: IChat[]; total: number }> {
    const skip = (page - 1) * limit;
    const userId_obj = new Types.ObjectId(userId);
    const chats = await Chat.find({ userId: userId_obj } as any)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const total = await Chat.countDocuments({ userId: userId_obj } as any);
    return { chats, total };
  }

  async getChatById(id: string): Promise<IChat> {
    const chat = await Chat.findById(id).populate('messages');
    if (!chat) {
      throw new Error('Chat not found');
    }
    return chat;
  }

  async addMessage(chatId: string, role: 'user' | 'assistant', content: string): Promise<IMessage> {
    const message = await Message.create({
      chatId,
      role,
      content,
    });

    await Chat.findByIdAndUpdate(chatId, {
      $push: { messages: message._id },
      updatedAt: new Date(),
    });

    return message;
  }

  async deleteChat(id: string): Promise<void> {
    const chat = await Chat.findByIdAndDelete(id);
    if (!chat) {
      throw new Error('Chat not found');
    }

    await Message.deleteMany({ chatId: id });
  }

  async updateChatTitle(id: string, title: string): Promise<IChat> {
    const chat = await Chat.findByIdAndUpdate(id, { title }, { new: true });
    if (!chat) {
      throw new Error('Chat not found');
    }
    return chat;
  }

  // Simple response generator (can be replaced with actual AI API)
  async generateResponse(userMessage: string): Promise<string> {
    // This is a placeholder - replace with actual AI service call
    const responses = [
      'That sounds interesting! Tell me more.',
      'I understand. How can I help you further?',
      'Great question! Let me think about that.',
      'I appreciate your input. Do you have any other questions?',
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}
