import Certificate from '../../models/certificate.model';

export async function seedCertificates(): Promise<void> {

    if (await Certificate.countDocuments()) {
        console.log('✔ Certificates already seeded');
        return;
    }

    await Certificate.insertMany([

        {

            title: 'AWS Cloud Practitioner',

            provider: 'Amazon Web Services',

            credentialId: 'AWS-12345',

            credentialUrl: '',

            issueDate: new Date('2024-05-01'),

            skills: [

                'AWS',

                'Cloud'

            ],

            image: '',

            featured: true,

            displayOrder: 1,

            status: 'ACTIVE'

        },

        {

            title: 'Angular Certification',

            provider: 'Udemy',

            credentialId: 'ANG-001',

            credentialUrl: '',

            issueDate: new Date('2023-10-10'),

            skills: [

                'Angular',

                'TypeScript'

            ],

            image: '',

            featured: true,

            displayOrder: 2,

            status: 'ACTIVE'

        }

    ]);

    console.log('✔ Certificates Seeded');

}