import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface ISetting extends Document {

    siteName: string;

    tagline: string;

    description: string;

    logo: string;

    favicon: string;

    email: string;

    phone: string;

    location: string;

    github: string;

    linkedin: string;

    twitter: string;

    website: string;

    seoTitle: string;

    seoDescription: string;

    theme: 'light' | 'dark';

    maintenanceMode: boolean;

    createdAt: Date;

    updatedAt: Date;

}

const SettingSchema = new Schema<ISetting>(
{

siteName:{type:String,required:true},

tagline:{type:String,default:''},

description:{type:String,default:''},

logo:{type:String,default:''},

favicon:{type:String,default:''},

email:{type:String,default:''},

phone:{type:String,default:''},

location:{type:String,default:''},

github:{type:String,default:''},

linkedin:{type:String,default:''},

twitter:{type:String,default:''},

website:{type:String,default:''},

seoTitle:{type:String,default:''},

seoDescription:{type:String,default:''},

theme:{
type:String,
enum:['light','dark'],
default:'light'
},

maintenanceMode:{
type:Boolean,
default:false
}

},
schemaOptions);

export default model<ISetting>(
'Setting',
SettingSchema
);