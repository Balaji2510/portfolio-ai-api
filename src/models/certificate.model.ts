import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface ICertificate extends Document {

  title: string;

  provider: string;

  credentialId?: string;

  credentialUrl?: string;

  issueDate?: Date;

  skills: string[];

  image?: string;

  featured: boolean;

  displayOrder: number;

  status: 'ACTIVE' | 'INACTIVE';

  createdAt: Date;

  updatedAt: Date;

}

const CertificateSchema = new Schema<ICertificate>(

{

title:{
type:String,
required:true,
trim:true
},

provider:{
type:String,
required:true,
trim:true
},

credentialId:{
type:String,
default:''
},

credentialUrl:{
type:String,
default:''
},

issueDate:{
type:Date
},

skills:{
type:[String],
default:[]
},

image:{
type:String,
default:''
},

featured:{
type:Boolean,
default:false
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

CertificateSchema.index({

displayOrder:1

});

export default model<ICertificate>(

'Certificate',

CertificateSchema

);