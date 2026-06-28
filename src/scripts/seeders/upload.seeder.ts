import User from '../../models/user.model';
import Upload from '../../models/upload.model';

export async function seedUploads(): Promise<void> {

    if (await Upload.countDocuments()) {

        console.log('✔ Uploads already seeded');

        return;

    }

    const adminUser = await User.findOne({ role: 'ADMIN' }).lean();

    if (!adminUser) {
        throw new Error('No admin user found for upload seeding');
    }

    await Upload.insertMany([

        {

            fileName: 'resume.pdf',

            originalName: 'Balaji Resume.pdf',

            fileUrl: '/uploads/resume.pdf',

            mimeType: 'application/pdf',

            size: 102400,

            folder: 'resume',

            uploadedBy: adminUser._id

        }

    ]);

    console.log('✔ Uploads Seeded');

}