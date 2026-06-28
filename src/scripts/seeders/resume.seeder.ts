import Resume from '../../models/resume.model';

export async function seedResume(): Promise<void> {

    if (await Resume.countDocuments()) {

        console.log('✔ Resume already seeded');

        return;

    }

    await Resume.create({

        title: 'Balaji Resume',

        version: '1.0',

        fileName: 'Balaji_Resume.pdf',

        fileUrl: '',

        fileSize: 0,

        active: true,

        uploadedBy: undefined

    });

    console.log('✔ Resume Seeded');

}