import Setting from '../../models/setting.model';

export async function seedSettings(): Promise<void> {

    const exists = await Setting.findOne();

    if (exists) {

        console.log('✔ Settings already exist');

        return;

    }

    await Setting.create({

        siteName: 'PortfolioAI',

        tagline: 'AI Powered Developer Portfolio',

        description: 'Modern AI Powered Developer Portfolio',

        logo: '',

        favicon: '',

        email: 'admin@portfolioai.com',

        phone: '+91 9876543210',

        location: 'Chennai, India',

        github: 'https://github.com/yourusername',

        linkedin: 'https://linkedin.com/in/yourusername',

        twitter: 'https://twitter.com/yourusername',

        website: 'https://portfolio-ai.vercel.app',

        seoTitle: 'PortfolioAI',

        seoDescription: 'AI Powered Portfolio',

        theme: 'light',

        maintenanceMode: false

    });

    console.log('✔ Settings Seeded');

}