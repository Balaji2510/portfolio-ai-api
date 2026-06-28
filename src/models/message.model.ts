import { Schema, model, Document, Types } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IMessage extends Document {

    chatId: Types.ObjectId;

    role: 'user' | 'assistant' | 'system';

    content: string;

    sources: string[];

    promptTokens: number;

    completionTokens: number;

    totalTokens: number;

    createdAt: Date;

    updatedAt: Date;

}

const MessageSchema = new Schema<IMessage>(
{

chatId:{
type:Schema.Types.ObjectId,
ref:'Chat',
required:true
},

role:{
type:String,
enum:[
'user',
'assistant',
'system'
],
required:true
},

content:{
type:String,
required:true
},

sources:{
type:[String],
default:[]
},

promptTokens:{
type:Number,
default:0
},

completionTokens:{
type:Number,
default:0
},

totalTokens:{
type:Number,
default:0
}

},
schemaOptions);

MessageSchema.index({

chatId:1

});

export default model<IMessage>(
'Message',
MessageSchema
);