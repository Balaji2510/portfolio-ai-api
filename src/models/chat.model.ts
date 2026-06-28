import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IChat extends Document {

    sessionId: string;

    title: string;

    userId?: Schema.Types.ObjectId;

    modelName: string;

    totalMessages: number;

    active: boolean;

    createdAt: Date;

    updatedAt: Date;

}

const ChatSchema = new Schema<IChat>(
{

sessionId:{
type:String,
required:true,
unique:true
},

title:{
type:String,
default:'New Chat'
},

userId:{
type:Schema.Types.ObjectId,
ref:'User'
},

modelName:{
type:String,
default:'gpt-5.5'
},

totalMessages:{
type:Number,
default:0
},

active:{
type:Boolean,
default:true
}

},
schemaOptions);

ChatSchema.index({

sessionId:1

},{
unique:true
});

export default model<IChat>(
'Chat',
ChatSchema
);