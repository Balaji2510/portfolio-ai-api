import { Schema, model, Document } from 'mongoose';

import { auditPlugin, paginationPlugin, slugPlugin, softDeletePlugin, toJSONPlugin } from '../plugins';
import { schemaOptions } from '../utils/schema-options';

export interface IBlog extends Document {

  title: string;

  slug: string;

  summary: string;

  content: string;

  coverImage: string;

  author: string;

  tags: string[];

  category: string;

  published: boolean;

  publishedAt?: Date;

  seoTitle: string;

  seoDescription: string;

  views: number;

  likes: number;

  createdAt: Date;

  updatedAt: Date;

}

const BlogSchema = new Schema<IBlog>(
{

title:{
type:String,
required:true
},

slug:{
type:String,
required:true,
unique:true,
lowercase:true
},

summary:{
type:String,
required:true
},

content:{
type:String,
required:true
},

coverImage:{
type:String,
default:''
},

author:{
type:String,
default:'Balaji'
},

tags:{
type:[String],
default:[]
},

category:{
type:String,
default:'General'
},

published:{
type:Boolean,
default:false
},

publishedAt:{
type:Date
},

seoTitle:{
type:String,
default:''
},

seoDescription:{
type:String,
default:''
},

views:{
type:Number,
default:0
},

likes:{
type:Number,
default:0
}

},
schemaOptions

);

BlogSchema.plugin(paginationPlugin);
BlogSchema.plugin(softDeletePlugin);
BlogSchema.plugin(slugPlugin);
BlogSchema.plugin(toJSONPlugin);
BlogSchema.plugin(auditPlugin);

BlogSchema.index({

slug:1

},
{

unique:true

});

BlogSchema.index({

published:1

});

export default model<IBlog>(
'Blog',
BlogSchema
);