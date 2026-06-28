import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IExperience extends Document {

  company: string;

  companyLogo: string;

  designation: string;

  employmentType:
    | 'Full Time'
    | 'Part Time'
    | 'Contract'
    | 'Internship'
    | 'Freelance';

  location: string;

  workMode:
    | 'Onsite'
    | 'Hybrid'
    | 'Remote';

  startDate: Date;

  endDate?: Date;

  current: boolean;

  responsibilities: string[];

  achievements: string[];

  technologies: string[];

  displayOrder: number;

  status: 'ACTIVE' | 'INACTIVE';

  createdAt: Date;

  updatedAt: Date;

}

const ExperienceSchema = new Schema<IExperience>(

{

company:{
type:String,
required:true,
trim:true
},

companyLogo:{
type:String,
default:''
},

designation:{
type:String,
required:true
},

employmentType:{
type:String,
enum:[
'Full Time',
'Part Time',
'Contract',
'Internship',
'Freelance'
],
default:'Full Time'
},

location:{
type:String,
required:true
},

workMode:{
type:String,
enum:[
'Onsite',
'Hybrid',
'Remote'
],
default:'Onsite'
},

startDate:{
type:Date,
required:true
},

endDate:{
type:Date
},

current:{
type:Boolean,
default:false
},

responsibilities:{
type:[String],
default:[]
},

achievements:{
type:[String],
default:[]
},

technologies:{
type:[String],
default:[]
},

displayOrder:{
type:Number,
default:1
},

status:{
type:String,
enum:[
'ACTIVE',
'INACTIVE'
],
default:'ACTIVE'
}

},

schemaOptions

);

ExperienceSchema.index({

current:1

});

ExperienceSchema.index({

displayOrder:1

});

export default model<IExperience>(

'Experience',

ExperienceSchema

);