import Education from '../../models/education.model';

export async function seedEducations(): Promise<void> {
    await Education.deleteMany({});

    await Education.create([
        {
            institution: 'Hindusthan College of Engineering and Technology',
            degree: 'Bachelor of Engineering',
            specialization: 'Computer Science',
            startYear: 2018,
            endYear: 2022,
            grade: 'First Class (CGPA: 7.5)',
            activities: [],
            description: 'Graduated with First Class.',
            status: 'ACTIVE',
            displayOrder: 1
        }
    ]);

    console.log('✔ Education Wiped and Seeded from Resume');
}