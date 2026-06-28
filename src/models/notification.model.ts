import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface INotification extends Document {

    title: string;

    message: string;

    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

    read: boolean;

    createdAt: Date;

    updatedAt: Date;

    userId?: Schema.Types.ObjectId;

}

const NotificationSchema = new Schema<INotification>(
{

title:{
type:String,
required:true
},

message:{
type:String,
required:true
},

userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
},

type:{
type:String,
enum:[
'INFO',
'SUCCESS',
'WARNING',
'ERROR'
],
default:'INFO'
},

read:{
type:Boolean,
default:false
}

},

schemaOptions);

NotificationSchema.index({

read:1

});

export default model<INotification>(
'Notification',
NotificationSchema
);