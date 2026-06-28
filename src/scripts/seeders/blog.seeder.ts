import Blog from '../../models/blog.model';

export async function seedBlogs(): Promise<void> {

    if (await Blog.countDocuments()) {

        console.log('✔ Blogs already seeded');

        return;

    }

    await Blog.insertMany([

        {

            title: 'Getting Started with Angular 20',

            slug: 'getting-started-angular-20',

            summary: 'Learn Angular from scratch.',

            content: 'Angular is a modern frontend framework...',

            coverImage: '',

            author: 'Balaji',

            tags: [

                'Angular',

                'Frontend'

            ],

            category: 'Angular',

            published: true,

            publishedAt: new Date(),

            seoTitle: 'Angular Tutorial',

            seoDescription: 'Learn Angular',

            views: 0,

            likes: 0

        },

        {

            title: 'Node.js Best Practices',

            slug: 'nodejs-best-practices',

            summary: 'Production ready Node.js.',

            content: 'Node.js backend development guide...',

            coverImage: '',

            author: 'Balaji',

            tags: [

                'Node.js',

                'Backend'

            ],

            category: 'Backend',

            published: true,

            publishedAt: new Date(),

            seoTitle: 'Node.js',

            seoDescription: 'Node.js Guide',

            views: 0,

            likes: 0

        }

    ]);

    console.log('✔ Blogs Seeded');

}