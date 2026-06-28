import Chat from '../../models/chat.model';
import Message from '../../models/message.model';

export async function seedMessages(): Promise<void> {

    if (await Message.countDocuments()) {

        console.log('✔ Messages already seeded');

        return;

    }

    const chat = await Chat.findOne();

    if (!chat) return;

    await Message.insertMany([

        {

            chatId: chat._id,

            role: 'user',

            content: 'Tell me about Balaji.',

            sources: [],

            promptTokens: 12,

            completionTokens: 0,

            totalTokens: 12

        },

        {

            chatId: chat._id,

            role: 'assistant',

            content: 'Balaji is a MEAN Stack Developer with AI experience.',

            sources: [

                'Resume'

            ],

            promptTokens: 12,

            completionTokens: 20,

            totalTokens: 32

        }

    ]);

    console.log('✔ Messages Seeded');

}