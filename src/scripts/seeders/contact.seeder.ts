import Contact from '../../models/contact.model';

export async function seedContacts(): Promise<void> {

    if (await Contact.countDocuments()) {
        console.log('✔ Contacts already seeded');
        return;
    }

    await Contact.insertMany([

        {
            name: 'John Smith',
            email: 'john@example.com',
            phone: '+1 9876543210',
            company: 'Google',
            subject: 'Angular Developer Position',
            message: 'We would like to discuss an opportunity.',
            status: 'NEW'
        },

        {
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '+91 9999999999',
            company: 'Microsoft',
            subject: 'Freelance Project',
            message: 'Need AI portfolio development.',
            status: 'READ'
        }

    ]);

    console.log('✔ Contacts Seeded');

}