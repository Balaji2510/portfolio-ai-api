import Analytics from '../../models/analytics.model';

export async function seedAnalytics(): Promise<void> {

    if (await Analytics.countDocuments()) {

        console.log('✔ Analytics already seeded');

        return;

    }

    await Analytics.create({

        portfolioViews: 0,

        uniqueVisitors: 0,

        resumeDownloads: 0,

        aiChats: 0,

        contactRequests: 0,

        projectViews: 0,

        blogViews: 0

    } as any);

    console.log('✔ Analytics Seeded');

}