import { Schema } from 'mongoose';

export function auditPlugin(schema: Schema) {

    schema.add({

        createdBy: {

            type: Schema.Types.ObjectId,

            ref: 'User'

        },

        updatedBy: {

            type: Schema.Types.ObjectId,

            ref: 'User'

        }

    });

}