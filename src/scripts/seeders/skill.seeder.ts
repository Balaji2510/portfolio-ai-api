import Skill from '../../models/skill.model';

export async function seedSkills(): Promise<void> {

    const count = await Skill.countDocuments();

    if (count > 0) {

        console.log('✔ Skills already exist');

        return;

    }

    await Skill.insertMany([

        {

            name:'Angular',

            category:'Frontend',

            level:95,

            yearsOfExperience:3.5,

            icon:'angular',

            color:'#DD0031',

            featured:true,

            displayOrder:1

        },

        {

            name:'TypeScript',

            category:'Frontend',

            level:95,

            yearsOfExperience:3.5,

            icon:'typescript',

            color:'#3178C6',

            featured:true,

            displayOrder:2

        },

        {

            name:'JavaScript',

            category:'Frontend',

            level:95,

            yearsOfExperience:3.5,

            icon:'javascript',

            color:'#F7DF1E',

            featured:true,

            displayOrder:3

        },

        {

            name:'HTML',

            category:'Frontend',

            level:95,

            yearsOfExperience:3.5,

            icon:'html5',

            color:'#E34F26',

            displayOrder:4

        },

        {

            name:'CSS',

            category:'Frontend',

            level:90,

            yearsOfExperience:3.5,

            icon:'css3',

            color:'#1572B6',

            displayOrder:5

        },

        {

            name:'SCSS',

            category:'Frontend',

            level:90,

            yearsOfExperience:3,

            icon:'sass',

            color:'#CC6699',

            displayOrder:6

        },

        {

            name:'Angular Material',

            category:'Frontend',

            level:90,

            yearsOfExperience:3,

            icon:'angular',

            color:'#DD0031',

            displayOrder:7

        },

        {

            name:'Node.js',

            category:'Backend',

            level:90,

            yearsOfExperience:3.5,

            icon:'node',

            color:'#3C873A',

            featured:true,

            displayOrder:8

        },

        {

            name:'Express.js',

            category:'Backend',

            level:90,

            yearsOfExperience:3.5,

            icon:'express',

            color:'#000000',

            displayOrder:9

        },

        {

            name:'MongoDB',

            category:'Database',

            level:90,

            yearsOfExperience:3,

            icon:'mongodb',

            color:'#13AA52',

            featured:true,

            displayOrder:10

        },

        {

            name:'AWS',

            category:'Cloud',

            level:80,

            yearsOfExperience:2,

            icon:'aws',

            color:'#FF9900',

            displayOrder:11

        },

        {

            name:'Git',

            category:'Tools',

            level:95,

            yearsOfExperience:4,

            icon:'git',

            color:'#F05032',

            displayOrder:12

        }

    ]);

    console.log('✔ Skills Seeded');

}