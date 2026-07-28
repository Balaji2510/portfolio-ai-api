import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Statistics from '../models/statistics.model';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_ai');
    console.log('Connected to MongoDB');

    const data = [
      {
        icon: '💼',
        title: 'Experience',
        value: '3.5+',
        description: 'Years'
      },
      {
        icon: '🚀',
        title: 'Projects',
        value: '3+',
        description: 'Completed'
      },
      {
        icon: '💻',
        title: 'Technologies',
        value: '15+',
        description: 'Worked With'
      },
      {
        icon: '🤖',
        title: 'AI Apps',
        value: '5+',
        description: 'Built'
      }
    ];

    await Statistics.deleteMany({});
    await Statistics.insertMany(data);
    
    console.log('Successfully seeded statistics!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding statistics:', error);
    process.exit(1);
  }
};

seed();
