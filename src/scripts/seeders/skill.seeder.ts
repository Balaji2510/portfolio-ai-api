import Skill from '../../models/skill.model';

export async function seedSkills(): Promise<void> {
    await Skill.deleteMany({});

    const skills = [
        // Frontend
        { name: 'Angular', category: 'Frontend', level: 95, yearsOfExperience: 4, icon: 'fab fa-angular', color: '#DD0031', featured: true, displayOrder: 1 },
        { name: 'TypeScript', category: 'Frontend', level: 90, yearsOfExperience: 4, icon: 'fab fa-js', color: '#3178C6', featured: true, displayOrder: 2 },
        { name: 'JavaScript (ES6+)', category: 'Frontend', level: 90, yearsOfExperience: 4, icon: 'fab fa-js-square', color: '#F7DF1E', featured: false, displayOrder: 3 },
        { name: 'HTML5/CSS3', category: 'Frontend', level: 95, yearsOfExperience: 4, icon: 'fab fa-html5', color: '#E34F26', featured: false, displayOrder: 4 },
        { name: 'Bootstrap', category: 'Frontend', level: 85, yearsOfExperience: 4, icon: 'fab fa-bootstrap', color: '#7952B3', featured: false, displayOrder: 5 },
        { name: 'RxJS', category: 'Frontend', level: 85, yearsOfExperience: 4, icon: 'fas fa-code', color: '#B7178C', featured: false, displayOrder: 6 },
        { name: 'Angular Material', category: 'Frontend', level: 85, yearsOfExperience: 4, icon: 'fas fa-paint-brush', color: '#3f51b5', featured: false, displayOrder: 7 },
        { name: 'AGGrid', category: 'Frontend', level: 80, yearsOfExperience: 2, icon: 'fas fa-table', color: '#4F46E5', featured: false, displayOrder: 8 },

        // Backend
        { name: 'Node.js', category: 'Backend', level: 90, yearsOfExperience: 4, icon: 'fab fa-node-js', color: '#339933', featured: true, displayOrder: 9 },
        { name: 'Express.js', category: 'Backend', level: 90, yearsOfExperience: 4, icon: 'fab fa-node', color: '#000000', featured: true, displayOrder: 10 },
        { name: 'REST APIs', category: 'Backend', level: 95, yearsOfExperience: 4, icon: 'fas fa-server', color: '#4F46E5', featured: false, displayOrder: 11 },
        { name: 'GraphQL', category: 'Backend', level: 80, yearsOfExperience: 2, icon: 'fas fa-project-diagram', color: '#E10098', featured: true, displayOrder: 12 },

        // Cloud
        { name: 'AWS (Lambda, S3, EC2)', category: 'Cloud', level: 85, yearsOfExperience: 4, icon: 'fab fa-aws', color: '#FF9900', featured: true, displayOrder: 13 },
        { name: 'API Gateway', category: 'Cloud', level: 85, yearsOfExperience: 3, icon: 'fas fa-network-wired', color: '#FF9900', featured: false, displayOrder: 14 },
        { name: 'CloudFront & IAM', category: 'Cloud', level: 85, yearsOfExperience: 3, icon: 'fas fa-shield-alt', color: '#FF9900', featured: false, displayOrder: 15 },
        { name: 'AppSync', category: 'Cloud', level: 80, yearsOfExperience: 2, icon: 'fas fa-sync', color: '#FF9900', featured: false, displayOrder: 16 },
        { name: 'ECS/Fargate', category: 'Cloud', level: 75, yearsOfExperience: 2, icon: 'fas fa-cubes', color: '#FF9900', featured: false, displayOrder: 17 },

        // IaC & DevOps
        { name: 'Terraform', category: 'DevOps', level: 80, yearsOfExperience: 3, icon: 'fas fa-cubes', color: '#5C4EE5', featured: true, displayOrder: 18 },
        { name: 'Terragrunt', category: 'DevOps', level: 75, yearsOfExperience: 2, icon: 'fas fa-layer-group', color: '#5C4EE5', featured: false, displayOrder: 19 },
        { name: 'GitHub Actions', category: 'DevOps', level: 85, yearsOfExperience: 3, icon: 'fab fa-github', color: '#2088FF', featured: true, displayOrder: 20 },
        { name: 'Docker', category: 'DevOps', level: 80, yearsOfExperience: 3, icon: 'fab fa-docker', color: '#2496ED', featured: false, displayOrder: 21 },
        { name: 'Serverless Framework', category: 'DevOps', level: 80, yearsOfExperience: 2, icon: 'fas fa-bolt', color: '#FD5750', featured: false, displayOrder: 22 },

        // Databases
        { name: 'PostgreSQL', category: 'Database', level: 90, yearsOfExperience: 4, icon: 'fas fa-database', color: '#336791', featured: true, displayOrder: 23 },
        { name: 'MongoDB', category: 'Database', level: 85, yearsOfExperience: 4, icon: 'fas fa-leaf', color: '#47A248', featured: true, displayOrder: 24 },

        // AI
        { name: 'Amazon Bedrock', category: 'AI', level: 80, yearsOfExperience: 2, icon: 'fas fa-brain', color: '#FF9900', featured: true, displayOrder: 25 },
        { name: 'LLM & RAG', category: 'AI', level: 85, yearsOfExperience: 2, icon: 'fas fa-robot', color: '#4F46E5', featured: true, displayOrder: 26 },
        { name: 'Prompt Engineering', category: 'AI', level: 85, yearsOfExperience: 2, icon: 'fas fa-comment-dots', color: '#4F46E5', featured: false, displayOrder: 27 },

        // Tools & Quality
        { name: 'SonarQube', category: 'Tools', level: 85, yearsOfExperience: 3, icon: 'fas fa-check-double', color: '#4E9BCD', featured: false, displayOrder: 28 },
        { name: 'Jest / Jasmine / Karma', category: 'Testing', level: 85, yearsOfExperience: 4, icon: 'fas fa-vial', color: '#C21325', featured: false, displayOrder: 29 }
    ];

    await Skill.create(skills);

    console.log('✔ Skills Wiped and Seeded from Resume');
}