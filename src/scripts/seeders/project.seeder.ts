import Project from '../../models/project.model';

export async function seedProjects(): Promise<void> {
    await Project.deleteMany({});

    await Project.create([
        {
            title: 'Deck Management Hub',
            slug: 'deck-management-hub',
            shortDescription: 'A centralized platform to manage, organize and streamline presentation decks.',
            description: 'A centralized platform to manage, organize and streamline the creation, sharing and maintenance of presentation decks.\n\n- Developed a responsive Angular UI used by 500+ users, reducing manual processing time by 40%.\n- Developed 35+ REST APIs serving 500+ daily users, Deck CRUD operations, user management and hierarchy approval.\n- Integrated AWS S3 for secure storage of files and deck exports (PDF), using CloudFront for delivery.\n- Implemented AWS SES integration to send transactional emails to dedicated users.\n- Integrated an AI chatbot to assist users with deck search, navigation and FAQs, reducing support tickets.\n- Set up CI/CD pipelines for automated testing, deployment and quality assurance.\n- Wrote unit test cases using Jest, Karma and Jasmine to ensure component and service reliability.\n- Provided hypercare support post go-live to resolve production issues and ensure smooth onboarding.',
            technologies: ['Angular v18', 'Node v22', 'PostgreSQL', 'AWS', 'S3', 'CloudFront', 'SES', 'AI Chatbot', 'Jest', 'Karma', 'Jasmine'],
            githubUrl: '',
            liveUrl: '',
            thumbnail: '',
            gallery: [],
            featured: true,
            status: 'ACTIVE',
            tags: ['Full Stack', 'Cloud', 'AI'],
            displayOrder: 1
        },
        {
            title: 'Vendor Management Portal',
            slug: 'vendor-management-portal',
            shortDescription: 'A centralized web-based platform to streamline vendor onboarding and monitoring.',
            description: 'A centralized web-based platform to streamline onboarding, communication, monitoring and evaluation of vendors and third-party providers across their entire lifecycle.\n\n- Developed a responsive front-end UI using Angular according to wireframe specifications.\n- Developed 25+ REST APIs for CRUD operations.\n- Developed real-time notifications using AWS DMS, Kinesis and AppSync (GraphQL API).\n- Integrated an AI-powered, voice-enabled chatbot into the portal using Angular, Node.js and LLM APIs, enabling voice and text-based interactions for improved user experience.\n- Implemented CloudFront + S3 secure file delivery.\n- Integrated AppSync GraphQL subscriptions for real-time notifications.\n- Achieved 80%-unit test coverage with Jasmine and Karma, and implemented CI/CD pipelines to streamline automated testing and deployment.\n- Collaborated with cross-functional teams in Agile sprints, optimizing frontend/backend performance for faster load times and scalable cloud deployments.\n- Provided hyper care support post go-live to resolve production issues and ensure smooth onboarding.',
            technologies: ['Angular v19', 'Node v22', 'PostgreSQL', 'AWS DMS', 'Kinesis', 'AppSync', 'GraphQL', 'LLM APIs', 'CloudFront', 'S3'],
            githubUrl: '',
            liveUrl: '',
            thumbnail: '',
            gallery: [],
            featured: true,
            status: 'ACTIVE',
            tags: ['Full Stack', 'Cloud', 'GenAI'],
            displayOrder: 2
        }
    ]);

    console.log('✔ Projects Wiped and Seeded from Resume');
}