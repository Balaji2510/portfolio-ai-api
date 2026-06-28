import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IResume extends Document {

  title: string;

  version: string;

  fileName: string;

  fileUrl: string;

  fileSize: number;

  active: boolean;

  uploadedBy: Schema.Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

}

const ResumeSchema = new Schema<IResume>(
{

title:{
type:String,
required:true
},

version:{
type:String,
required:true
},

fileName:{
type:String,
required:true
},

fileUrl:{
type:String,
default:''
},

fileSize:{
type:Number,
default:0
},

active:{
type:Boolean,
default:true
},

uploadedBy:{

type:Schema.Types.ObjectId,

ref:'User'

}

},
schemaOptions

);

ResumeSchema.index({

active:1

});

export default model<IResume>(
'Resume',
ResumeSchema
);