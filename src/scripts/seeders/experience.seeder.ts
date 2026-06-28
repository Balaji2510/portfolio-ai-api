import Experience from '../../models/experience.model';

export async function seedExperiences(): Promise<void> {

    if (await Experience.countDocuments()) {
        console.log('✔ Experiences already seeded');
        return;
    }

    await Experience.insertMany([

        {
            company: 'ABC Technologies',

            companyLogo: '',

            designation: 'MEAN Stack Developer',

            employmentType: 'Full Time',

            location: 'Chennai',

            workMode: 'Hybrid',

            startDate: new Date('2023-01-01'),

            current: true,

            responsibilities: [
                'Develop enterprise Angular applications',
                'Develop Node.js REST APIs',
                'Deploy applications to AWS',
                'Integrate AI solutions'
            ],

            achievements: [
                'Delivered multiple enterprise applications',
                'Reduced API response time by 40%'
            ],

            technologies: [
                'Angular',
                'Node.js',
                'MongoDB',
                'AWS',
                'GraphQL'
            ],

            displayOrder: 1,

            status: 'ACTIVE'
        }

    ]);

    console.log('✔ Experiences Seeded');

}