import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectDatabase from '../config/database';

import { seedUsers } from './seeders/user.seeder';
import { seedSettings } from './seeders/setting.seeder';
import { seedSkills } from './seeders/skill.seeder';
import { seedProjects } from './seeders/project.seeder';
import { seedExperiences } from './seeders/experience.seeder';
import { seedEducations } from './seeders/education.seeder';
import { seedCertificates } from './seeders/certificate.seeder';
import { seedResume } from './seeders/resume.seeder';
import { seedBlogs } from './seeders/blog.seeder';
import { seedContacts } from './seeders/contact.seeder';
import { seedKnowledge } from './seeders/knowledge.seeder';
import { seedUploads } from './seeders/upload.seeder';
import { seedAnalytics } from './seeders/analytics.seeder';
import { seedNotifications } from './seeders/notification.seeder';
import { seedChats } from './seeders/chat.seeder';
import { seedMessages } from './seeders/message.seeder';

dotenv.config();

const DB_NAME = process.env.DB_NAME || process.env.MONGO_DB_NAME || process.env.DATABASE_NAME || 'portfolio_ai';

async function seed() {

    try {

        await connectDatabase();

        console.log(` Using MongoDB database: ${DB_NAME}`);
        console.log(' Starting PortfolioAI Seed...\n');

        await seedUsers();
        await seedSettings();
        await seedSkills();
        await seedProjects();
        await seedExperiences();
        await seedEducations();
        await seedCertificates();
        await seedResume();
        await seedBlogs();
        await seedContacts();
        await seedKnowledge();
        await seedUploads();
        await seedAnalytics();
        await seedNotifications();
        await seedChats();
        await seedMessages();

        console.log('\n Database seeded successfully.');

    } catch (error) {

        console.error(' Seed failed:', error);

    } finally {

        await mongoose.disconnect();

        process.exit(0);

    }

}

seed();