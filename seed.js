require('dotenv').config();
const mongoose = require('mongoose');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const Project = require('./src/models/project.model').default;
    const Skill = require('./src/models/skill.model').default;
    const Experience = require('./src/models/experience.model').default;
    const Resume = require('./src/models/resume.model').default;

    // Clear existing
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Resume.deleteMany({});

    // Seed Skills
    const skills = [ 
      { name: 'Angular', category: 'Frontend', level: 90, yearsOfExperience: 3 },
      { name: 'TypeScript', category: 'Frontend', level: 85, yearsOfExperience: 3 },
      { name: 'Node.js', category: 'Backend', level: 80, yearsOfExperience: 2 },
      { name: 'MongoDB', category: 'Database', level: 75, yearsOfExperience: 2 },
    ];
    await Skill.insertMany(skills);
    console.log('Skills seeded');

    // Seed Projects
    const projects = [
      {
        title: 'Portfolio AI Assistant',
        slug: 'portfolio-ai-assistant',
        shortDescription: 'An AI-powered portfolio with a smart chatbot interface.',
        description: 'Built a full-stack portfolio application that integrates Groq and Llama 3 to answer questions about my experience and projects in real-time. The frontend uses Angular, and the backend is Express/MongoDB.',
        technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Groq', 'SCSS'],
        githubUrl: 'https://github.com/balaji/portfolio-ai',
        status: 'ACTIVE',
        displayOrder: 1
      },
      {
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        shortDescription: 'A scalable online marketplace built with MEAN stack.',
        description: 'Developed a fully functional e-commerce platform featuring user authentication, product search, cart management, and payment integration.',
        technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
        status: 'ACTIVE',
        displayOrder: 2
      }
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded');

    // Seed Experiences
    const experiences = [
      {
        company: 'Tech Innovators Inc.',
        designation: 'Software Engineer',
        employmentType: 'Full Time',
        location: 'San Francisco, CA',
        workMode: 'Hybrid',
        startDate: new Date('2024-01-01'),
        current: true,
        responsibilities: [
          'Developing scalable web applications using Angular and Node.js.',
          'Integrating AI models to enhance user experiences.',
          'Optimizing database queries in MongoDB.'
        ],
        technologies: ['Angular', 'Node.js', 'MongoDB', 'TypeScript'],
        displayOrder: 1
      },
      {
        company: 'Web Solutions LLC',
        designation: 'Frontend Developer',
        employmentType: 'Full Time',
        location: 'Remote',
        workMode: 'Remote',
        startDate: new Date('2022-05-01'),
        endDate: new Date('2023-12-31'),
        current: false,
        responsibilities: [
          'Built responsive UIs for various client projects.',
          'Collaborated with designers to implement pixel-perfect layouts.',
        ],
        technologies: ['React', 'JavaScript', 'CSS/SCSS'],
        displayOrder: 2
      }
    ];
    await Experience.insertMany(experiences);
    console.log('Experiences seeded');

    // Seed Resume
    const resume = {
      title: 'Balaji Resume 2026',
      version: '1.0',
      fileName: 'balaji_resume.pdf',
      active: true,
      parsedText: `
BALAJI - SOFTWARE ENGINEER
Experience:
- Software Engineer at Tech Innovators Inc. (2024 - Present): Building AI-powered web applications.
- Frontend Developer at Web Solutions LLC (2022 - 2023): Developing responsive UIs.

Skills: Angular, Node.js, TypeScript, MongoDB, SCSS.

Projects:
- Portfolio AI Assistant
- E-Commerce Platform
      `
    };
    await Resume.create(resume);
    console.log('Resume seeded');

    mongoose.connection.close();
    console.log('Seed complete!');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
