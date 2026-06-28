import Notification from '../../models/notification.model';

export async function seedNotifications(): Promise<void> {

    if (await Notification.countDocuments()) {

        console.log('✔ Notifications already seeded');

        return;

    }

    await Notification.insertMany([

        {

            title: 'Welcome',

            message: 'PortfolioAI initialized successfully.',

            type: 'SUCCESS',

            read: false

        },

        {

            title: 'System',

            message: 'Admin account created.',

            type: 'INFO',

            read: false

        }

    ]);

    console.log('✔ Notifications Seeded');

}