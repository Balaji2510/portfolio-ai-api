import { Schema } from 'mongoose';
import slugify from 'slugify';

export function slugPlugin(schema: Schema) {

    schema.pre('save', function (this: any) {
        if (this.isModified('title')) {
            const title = typeof this.title === 'string' ? this.title : '';

            if (title) {
                this.slug = slugify(title, {
                    lower: true,
                    strict: true
                });
            }
        }
    });

}