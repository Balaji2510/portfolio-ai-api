import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IContact extends Document {

    name: string;

    email: string;

    phone?: string;

    company?: string;

    subject: string;

    message: string;

    status: 'NEW' | 'READ' | 'REPLIED' | 'CLOSED';

    ipAddress?: string;

    userAgent?: string;

    createdAt: Date;

    updatedAt: Date;

}

const ContactSchema = new Schema<IContact>(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },

    phone:{
        type:String,
        default:''
    },

    company:{
        type:String,
        default:''
    },

    subject:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:[
            'NEW',
            'READ',
            'REPLIED',
            'CLOSED'
        ],
        default:'NEW'
    },

    ipAddress:{
        type:String,
        default:''
    },

    userAgent:{
        type:String,
        default:''
    }

},
schemaOptions);

ContactSchema.index({ status:1 });

ContactSchema.index({ createdAt:-1 });

export default model<IContact>(
    'Contact',
    ContactSchema
);