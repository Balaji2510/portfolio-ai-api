import { SchemaOptions } from 'mongoose';

export const schemaOptions: SchemaOptions = {

    timestamps: true,

    versionKey: false,

    toJSON: {

        virtuals: true,

        transform(doc, ret: any) {

            delete ret.__v;

            delete ret.password;

            return ret;

        }

    }

};