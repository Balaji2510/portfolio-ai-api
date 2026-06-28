import Education from '../../models/education.model';

export async function seedEducations(): Promise<void> {

    if (await Education.countDocuments()) {
        console.log('✔ Education already seeded');
        return;
    }

    await Education.insertMany([

        {

            institution: 'ABC Engineering College',

            degree: 'Bachelor of Engineering',

            specialization: 'Computer Science',

            location: 'Tamil Nadu',

            cgpa: 8.4,

            percentage: 84,

            startYear: 2018,

            endYear: 2022,

            description: 'Computer Science Engineering',

            achievements: [
                'Completed Final Year Project',
                'Coding Club Member'
            ],

            certificateUrl: '',

            displayOrder: 1,

            status: 'ACTIVE'

        }

    ]);

    console.log('✔ Education Seeded');

}