import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IKnowledge extends Document {

    title: string;

    description: string;

    type:
        | 'RESUME'
        | 'PROJECT'
        | 'CERTIFICATE'
        | 'BLOG'
        | 'FAQ'
        | 'DOCUMENT';

    fileName: string;

    fileUrl: string;

    text: string;

    embeddingId: string;

    tags: string[];

    active: boolean;

    uploadedBy: Schema.Types.ObjectId;

    createdAt: Date;

    updatedAt: Date;

}

const KnowledgeSchema = new Schema<IKnowledge>(
{
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:''
    },

    type:{
        type:String,
        enum:[
            'RESUME',
            'PROJECT',
            'CERTIFICATE',
            'BLOG',
            'FAQ',
            'DOCUMENT'
        ],
        default:'DOCUMENT'
    },

    fileName:{
        type:String,
        default:''
    },

    fileUrl:{
        type:String,
        default:''
    },

    text:{
        type:String,
        required:true
    },

    embeddingId:{
        type:String,
        default:''
    },

    tags:{
        type:[String],
        default:[]
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
schemaOptions);

KnowledgeSchema.index({ type:1 });

KnowledgeSchema.index({ active:1 });

KnowledgeSchema.index({ tags:1 });

export default model<IKnowledge>(
    'Knowledge',
    KnowledgeSchema
);