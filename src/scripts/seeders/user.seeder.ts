import bcrypt from 'bcrypt';

import User from '../../models/user.model';

export async function seedUsers(): Promise<void> {

    const exists = await User.findOne({

        email: 'admin@portfolioai.com'

    });

    if (exists) {

        console.log('✔ Admin user already exists');

        return;

    }

    const password = await bcrypt.hash(

        'Admin@123',

        10

    );

    await User.create({

        firstName: 'Balaji',

        lastName: 'P',

        email: 'admin@portfolioai.com',

        password,

        role: 'ADMIN',

        designation: 'MEAN Stack Developer',

        profileImage: '',

        github: '',

        linkedin: '',

        website: '',

        phone: '',

        location: 'Chennai',

        isActive: true

    });

    console.log('✔ Admin user created');

}