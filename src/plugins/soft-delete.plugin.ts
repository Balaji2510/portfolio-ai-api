import { Schema } from 'mongoose';

export function softDeletePlugin(schema: Schema) {

    schema.add({

        isDeleted: {

            type: Boolean,

            default: false

        },

        deletedAt: {

            type: Date,

            default: null

        }

    });

    schema.pre(/^find/, function (this: any, next: (err?: Error) => void) {

        this.where({

            isDeleted: false

        });

        next();

    });

}