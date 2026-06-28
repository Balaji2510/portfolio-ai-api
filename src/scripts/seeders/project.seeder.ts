import Project from '../../models/project.model';

export async function seedProjects(): Promise<void> {

    const count = await Project.countDocuments();

    if (count > 0) {

        console.log('✔ Projects already exist');

        return;

    }

    await Project.insertMany([

        {

            title:'PortfolioAI',

            slug:'portfolio-ai',

            shortDescription:'AI Powered Developer Portfolio',

            description:'Modern portfolio built using Angular, Node.js, MongoDB and AI.',

            technologies:[

                'Angular',

                'Node.js',

                'MongoDB',

                'OpenAI',

                'TypeScript'

            ],

            githubUrl:'https://github.com/yourusername/portfolio-ai',

            liveUrl:'https://portfolio-ai.vercel.app',

            thumbnail:'',

            gallery:[],

            featured:true,

            status:'ACTIVE',

            tags:[

                'AI',

                'Portfolio',

                'Angular'

            ],

            displayOrder:1

        },

        {

            title:'Vendor Management System',

            slug:'vendor-management-system',

            shortDescription:'Enterprise Vendor Portal',

            description:'Vendor Management Portal using Angular and Node.js.',

            technologies:[

                'Angular',

                'Node.js',

                'MongoDB',

                'AWS'

            ],

            githubUrl:'',

            liveUrl:'',

            thumbnail:'',

            gallery:[],

            featured:true,

            status:'ACTIVE',

            tags:[

                'Enterprise',

                'Angular'

            ],

            displayOrder:2

        },

        {

            title:'AI Resume Assistant',

            slug:'ai-resume-assistant',

            shortDescription:'Resume Analysis using AI',

            description:'AI-powered resume analyzer and chatbot.',

            technologies:[

                'Angular',

                'Node.js',

                'MongoDB',

                'LLM',

                'RAG'

            ],

            githubUrl:'',

            liveUrl:'',

            thumbnail:'',

            gallery:[],

            featured:true,

            status:'IN_PROGRESS',

            tags:[

                'AI',

                'Resume',

                'LLM'

            ],

            displayOrder:3

        }

    ]);

    console.log('✔ Projects Seeded');

}