import { Schema } from 'mongoose';
import slugify from 'slugify';

export function slugPlugin(schema: Schema) {

    (schema as any).pre('save', function (this: any, next: (err?: Error) => void) {

        if (this.isModified('title')) {
            const title = typeof this.title === 'string' ? this.title : '';

            if (title) {
                this.slug = slugify(title, {
                    lower: true,
                    strict: true
                });
            }
        }

        next();

    });

}