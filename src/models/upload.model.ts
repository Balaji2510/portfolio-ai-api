import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IUpload extends Document {

    fileName: string;

    originalName: string;

    fileUrl: string;

    mimeType: string;

    size: number;

    folder: string;

    uploadedBy: Schema.Types.ObjectId;

    createdAt: Date;

    updatedAt: Date;

}

const UploadSchema = new Schema<IUpload>(
    {

        fileName: {
            type: String,
            required: true
        },

        originalName: {
            type: String,
            required: true
        },

        fileUrl: {
            type: String,
            required: true
        },

        mimeType: {
            type: String,
            required: true
        },

        size: {
            type: Number,
            default: 0
        },

        folder: {
            type: String,
            default: 'uploads'
        },

        uploadedBy: {

            type: Schema.Types.ObjectId,

            ref: 'User'

        }

    },
    schemaOptions);

UploadSchema.index({
    folder: 1
});

UploadSchema.index({
    createdAt: -1
});

export default model<IUpload>(
    'Upload',
    UploadSchema
);