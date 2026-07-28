require('dotenv').config({ path: '.env.production' });
const mongoose = require('mongoose');

const uri = process.env.STORAGE_MONGO_URI;

mongoose.connect(uri, { dbName: 'portfolio_ai' }).then(async () => {
  console.log('Connected to MongoDB');
  
  // Use a generic schema for the skills collection
  const Skill = mongoose.model('Skill', new mongoose.Schema({}, { strict: false }));

  // Seed logic
  const skillsToSeed = [
    { name: 'Angular', icon: 'assets/skills/angular.jpg', level: 90, category: 'Frontend', color: '#DD0031' },
    { name: 'Node.js', icon: 'assets/skills/nodejs.jpg', level: 85, category: 'Backend', color: '#339933' },
    { name: 'AWS', icon: 'assets/skills/aws.jpg', level: 80, category: 'DevOps', color: '#FF9900' },
    { name: 'MongoDB', icon: 'assets/skills/mongodb.jpg', level: 85, category: 'Database', color: '#47A248' }
  ];

  await Skill.deleteMany({});
  const result = await Skill.insertMany(skillsToSeed);
  console.log(`Seeded ${result.length} skills successfully.`);

  mongoose.connection.close();
}).catch(err => console.error(err));
