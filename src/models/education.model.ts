import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IEducation extends Document {

  institution: string;

  degree: string;

  specialization: string;

  location: string;

  cgpa: number;

  percentage: number;

  startYear: number;

  endYear: number;

  description: string;

  achievements: string[];

  certificateUrl: string;

  displayOrder: number;

  status: 'ACTIVE' | 'INACTIVE';

  createdAt: Date;

  updatedAt: Date;

}

const EducationSchema = new Schema<IEducation>(

{

institution:{
type:String,
required:true
},

degree:{
type:String,
required:true
},

specialization:{
type:String,
required:true
},

location:{
type:String,
default:''
},

cgpa:{
type:Number,
default:0
},

percentage:{
type:Number,
default:0
},

startYear:{
type:Number,
required:true
},

endYear:{
type:Number,
required:true
},

description:{
type:String,
default:''
},

achievements:{
type:[String],
default:[]
},

certificateUrl:{
type:String,
default:''
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

EducationSchema.index({

displayOrder:1

});

export default model<IEducation>(

'Education',

EducationSchema

);