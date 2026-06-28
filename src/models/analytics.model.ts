import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IAnalytics extends Document {

    portfolioViews: number;

    uniqueVisitors: number;

    resumeDownloads: number;

    aiChats: number;

    contactRequests: number;

    projectViews: number;

    blogViews: number;

    createdAt: Date;

    updatedAt: Date;

}

const AnalyticsSchema = new Schema<IAnalytics>(
{

    portfolioViews:{
        type:Number,
        default:0
    },

    uniqueVisitors:{
        type:Number,
        default:0
    },

    resumeDownloads:{
        type:Number,
        default:0
    },

    aiChats:{
        type:Number,
        default:0
    },

    contactRequests:{
        type:Number,
        default:0
    },

    projectViews:{
        type:Number,
        default:0
    },

    blogViews:{
        type:Number,
        default:0
    }

},
schemaOptions);

export default model<IAnalytics>(
    'Analytics',
    AnalyticsSchema
);