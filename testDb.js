require('dotenv').config();
const mongoose = require('mongoose');

async function test() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const Project = require('./src/models/project.model').default;
  const Skill = require('./src/models/skill.model').default;
  const Experience = require('./src/models/experience.model').default;
  const Resume = require('./src/models/resume.model').default;

  const projects = await Project.find({});
  const skills = await Skill.find({});
  const experiences = await Experience.find({});
  const resume = await Resume.findOne({});

  console.log('Projects count:', projects.length);
  console.log('Skills count:', skills.length);
  console.log('Experiences count:', experiences.length);
  console.log('Resume exists:', !!resume);

  mongoose.connection.close();
}
test();
