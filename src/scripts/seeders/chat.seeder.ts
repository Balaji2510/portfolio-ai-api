import { randomUUID } from 'crypto';

import Chat from '../../models/chat.model';

export async function seedChats(): Promise<void> {

    if (await Chat.countDocuments()) {

        console.log('✔ Chats already seeded');

        return;

    }

    await Chat.create({

        sessionId: randomUUID(),

        title: 'Welcome Chat',

        modelName: 'gpt-3.5-turbo',
        totalMessages: 2,

        active: true

    });

    console.log('✔ Chats Seeded');

}