import Experience from '../../models/experience.model';

export async function seedExperiences(): Promise<void> {
    await Experience.deleteMany({});

    await Experience.create([
        {
            company: 'Infosys Limited',
            companyLogo: '',
            designation: 'Senior Systems Engineer',
            employmentType: 'Full Time',
            location: 'Chennai, India',
            workMode: 'Onsite',
            startDate: new Date('2022-08-01'),
            current: true,
            responsibilities: [
                'Developed scalable cloud-native AWS applications using Angular, Node.js, Express.js, PostgreSQL, and Terraform, serving 500+ users while ensuring high availability, security, and performance.',
                'Architected modular backend services using Node.js and Express.js to improve maintainability and scalability.',
                'Developed secure RESTful APIs with JWT-based authentication and Role-Based Access Control (RBAC).',
                'Integrated PostgreSQL and MongoDB for efficient data management and optimized database queries.',
                'Optimized API performance, significantly reducing response times and improving application responsiveness.',
                'Optimized Angular application performance by implementing lazy loading, efficient change detection, API optimization, and bundle size reduction, resulting in faster page load times and an improved user experience.',
                'Implemented real-time notifications using AWS AppSync (GraphQL), Kinesis, and event-driven architecture, enabling instant updates across the application.',
                'Designed and implemented secure file upload/download architecture using Amazon S3, CloudFront, and IAM policies to ensure secure document access.',
                'Provisioned and managed AWS cloud infrastructure using Terraform and Terragrunt, enabling consistent deployments across development, QA, and production environments.',
                'Integrated an AI-powered chatbot into the application to improve user support and automate routine queries.',
                'Implemented CI/CD pipelines using GitHub Actions, improving deployment frequency by 40%.',
                'Enforced code quality standards using SonarQube, reducing code issues by 25%.',
                'Collaborated with product owners, architects, QA teams, and DevOps engineers to deliver secure, scalable, and cloud-native enterprise solutions.',
                'Participated in Agile ceremonies, sprint planning, code reviews, production deployments, architecture discussions, and hypercare support to ensure timely feature delivery and rapid issue resolution.'
            ],
            achievements: [],
            technologies: ['Angular', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Terraform', 'AppSync', 'GraphQL', 'S3', 'CloudFront', 'GitHub Actions', 'SonarQube'],
            displayOrder: 1,
            status: 'ACTIVE'
        }
    ]);

    console.log('✔ Experiences Wiped and Seeded from Resume');
}