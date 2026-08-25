import Setting from '../../models/setting.model';

export async function seedSettings(): Promise<void> {
    await Setting.deleteMany({});
    
    await Setting.create({
        siteName: 'BALAJI P',
        tagline: 'AWS Full Stack Developer | MEAN Stack | GenAI Integration',
        description: 'Results-driven AWS Full Stack Developer (MEAN Stack) with 4 years of experience designing and deploying scalable web applications using Angular, Node.js, Express.js, MongoDB and PostgreSQL. Skilled in building modular, component-driven Angular frontends, secure RESTful APIs with JWT-based authentication and Role-Based Access Control (RBAC), and architecting cloud-native solutions on AWS (S3, SES, CloudFront, Kinesis, AppSync). Experienced in integrating AI-powered chatbots into web applications to enhance user engagement and automate workflows. Strong focus on CI/CD implementation, performance optimization, and secure, maintainable system architecture in Agile environments.',
        logo: '',
        favicon: '',
        email: 'balajip2510@gmail.com',
        phone: '+91 88256 78554',
        location: 'Chennai, India',
        github: 'https://github.com/Balaji2510',
        linkedin: 'https://linkedin.com/in/balajip2510',
        twitter: '',
        website: 'https://balaji-portfolio-ai.vercel.app',
        seoTitle: 'Balaji P | AWS Full Stack Developer',
        seoDescription: 'Portfolio of Balaji P, an AWS Full Stack Developer with 4 years experience in MEAN Stack and GenAI Integration.',
        theme: 'dark',
        maintenanceMode: false
    });

    console.log('✔ Settings Wiped and Seeded from Resume');
}