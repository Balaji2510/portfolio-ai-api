import User from '../../models/user.model';
import Knowledge from '../../models/knowledge.model';

export async function seedKnowledge(): Promise<void> {

    if (await Knowledge.countDocuments()) {
        console.log('✔ Knowledge already seeded');
        return;
    }

    const adminUser = await User.findOne({ role: 'ADMIN' }).lean();

    if (!adminUser) {
        throw new Error('No admin user found for knowledge seeding');
    }

    await Knowledge.insertMany([

        {
            title: 'Resume',

            description: 'Resume Knowledge',

            type: 'RESUME',

            fileName: 'resume.pdf',

            fileUrl: '',

            text: 'Balaji is a MEAN Stack Developer with 3.5 years of experience.',

            embeddingId: '',

            tags: [

                'resume',

                'career'

            ],

            active: true,

            uploadedBy: adminUser._id

        },

        {

            title: 'PortfolioAI',

            description: 'Project',

            type: 'PROJECT',

            fileName: '',

            fileUrl: '',

            text: 'PortfolioAI is built using Angular Node MongoDB AI.',

            embeddingId: '',

            tags: [

                'portfolio',

                'ai'

            ],

            active: true,

            uploadedBy: adminUser._id

        }

    ]);

    console.log('✔ Knowledge Seeded');

}