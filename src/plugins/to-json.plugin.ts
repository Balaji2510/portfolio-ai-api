import { Schema } from 'mongoose';

export function toJSONPlugin(schema: Schema) {

    schema.set('toJSON', {

        virtuals: true,

        versionKey: false,

        transform(_doc: unknown, ret: Record<string, any>) {

            delete ret.password;

            delete ret.__v;

            delete ret._id;

            return ret;

        }

    });

}