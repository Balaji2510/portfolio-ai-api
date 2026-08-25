import Chat from '../../models/chat.model';
import Message from '../../models/message.model';
import { IChat } from '../../models/chat.model';
import { IMessage } from '../../models/message.model';
import { Types } from 'mongoose';
import Groq from 'groq-sdk';
import { ProjectsService, SkillsService, ExperienceService } from '../portfolio/portfolio.service';


let groqInstance: Groq | null = null;
const getGroq = () => {
  if (!groqInstance) {
    const apiKey = process.env.GROQ_API_KEY;
    console.log("DEBUG: Checking GROQ_API_KEY...");
    console.log(`DEBUG: Key exists? ${!!apiKey}`);
    console.log(`DEBUG: Key type? ${typeof apiKey}`);
    console.log(`DEBUG: Key length? ${apiKey ? apiKey.length : 0}`);
    if (apiKey && apiKey.length > 5) {
      console.log(`DEBUG: Key starts with: ${apiKey.substring(0, 4)}...`);
    }

    groqInstance = new Groq({
      apiKey: apiKey || 'missing_key',
    });
  }
  return groqInstance;
};
export class ChatService {
  private projectsService = new ProjectsService();
  private skillsService = new SkillsService();
  private experienceService = new ExperienceService();

  async createChat(userId?: string, title?: string): Promise<IChat> {
    const chatData: any = {
      title: title || 'New Chat',
      sessionId: Date.now().toString(),
    };
    if (userId) {
      chatData.userId = new Types.ObjectId(userId);
    }
    const chat = await Chat.create(chatData);

    return chat;
  }

  async getUserChats(userId?: string, page: number = 1, limit: number = 20): Promise<{ chats: IChat[]; total: number }> {
    const skip = (page - 1) * limit;
    const query = userId ? { userId: new Types.ObjectId(userId) } : {};
    const chats = await Chat.find(query as any)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const total = await Chat.countDocuments(query as any);
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

  async generateTitle(userMessage: string): Promise<string> {
    try {
      const prompt = `Generate a very short, concise title (max 4-5 words) for a chat that starts with this message:\n"${userMessage}"\n\nTitle:`;
      const completion = await getGroq().chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-8b-8192',
      });
      return completion.choices[0]?.message?.content?.replace(/["']/g, '').trim() || 'New Chat';
    } catch (error) {
      console.error('Groq API Error in generateTitle:', error);
      return 'New Chat';
    }
  }

  async generateResponse(chatId: string, userMessage: string): Promise<string> {
    try {
      const chat = await Chat.findById(chatId).populate('messages');
      if (!chat) throw new Error('Chat not found');

      const chatMessages = chat.messages || [];
      const history = chatMessages.map((m: any) => ({
        role: m.role,
        content: m.content,
      }));

      // Append the current message
      history.push({ role: 'user', content: userMessage });

      // Build context
      let systemPrompt = `You are the official AI clone of Balaji, a software engineer. Your purpose is to answer questions from visitors on your personal portfolio website.

CORE RULES:
- ALWAYS speak in the first person (use "I", "me", "my", "mine"). Act as if you ARE Balaji.
- NEVER refer to "Balaji" in the third person.
- NEVER refer to "the portfolio" or "the owner". Talk about "my projects", "my skills", and "my experience".
- Keep your answers concise, natural, and highly professional.

HANDLING QUESTIONS:
- If a user simply greets you (e.g., "hi", "hello"), warmly welcome them, introduce yourself as Balaji's AI clone, and ask if they'd like to hear about your projects, skills, or experience.
- Answer questions based ONLY on the provided context data below. Do not make up information.
- If asked a question that cannot be answered using the context, politely explain that as an AI clone, you are only equipped to discuss your professional background.\n\n`;
      try {
        const { projects } = await this.projectsService.getAllProjects(1, 20);
        const { skills } = await this.skillsService.getAllSkills(1, 50);
        const { experiences } = await this.experienceService.getAllExperiences(1, 10);


        systemPrompt += 'PORTFOLIO DATA:\n';
        
        if (projects.length > 0) {
          systemPrompt += '\nPROJECTS:\n' + projects.map((p: any) => `- ${p.title}: ${p.shortDescription} (Tech: ${p.technologies?.join(', ') || 'N/A'})`).join('\n');
        }
        
        if (skills.length > 0) {
          systemPrompt += '\nSKILLS:\n' + skills.map((s: any) => `- ${s.name} (${s.category})`).join('\n');
        }

        if (experiences.length > 0) {
          systemPrompt += '\nEXPERIENCE:\n' + experiences.map((e: any) => `- ${e.title} at ${e.company} (${e.startDate ? new Date(e.startDate).getFullYear() : ''} - ${e.endDate ? new Date(e.endDate).getFullYear() : 'Present'})`).join('\n');
        }


      } catch (err) {
        console.error('Error fetching context:', err);
      }

      const completion = await getGroq().chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          ...history
        ],
        model: 'llama3-8b-8192',
      });

      return completion.choices[0]?.message?.content || 'I am sorry, I could not generate a response.';
    } catch (error) {
      console.error('Groq API Error:', error);
      return 'Sorry, I am having trouble connecting to my AI brain right now.';
    }
  }
}
