const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolio-ai').then(async () => {
  console.log('Connected to MongoDB');
  
  // Use a generic schema for the skills collection
  const Skill = mongoose.model('Skill', new mongoose.Schema({}, { strict: false }));

  // Update logic
  const updates = [
    { name: 'Angular', icon: 'assets/skills/angular.jpg' },
    { name: 'Node.js', icon: 'assets/skills/nodejs.jpg' },
    { name: 'AWS', icon: 'assets/skills/aws.jpg' },
    { name: 'MongoDB', icon: 'assets/skills/mongodb.jpg' }
  ];

  for (const update of updates) {
    const result = await Skill.updateOne(
      { name: new RegExp(update.name, 'i') }, 
      { $set: { icon: update.icon } }
    );
    console.log(`Updated ${update.name}:`, result.modifiedCount > 0 ? 'Success' : 'No document found or modified');
  }

  mongoose.connection.close();
}).catch(err => console.error(err));
