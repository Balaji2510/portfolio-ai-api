import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface IUser extends Document {

  firstName: string;

  lastName: string;

  email: string;

  password: string;

  role: 'ADMIN' | 'USER';

  designation: string;

  profileImage?: string;

  github?: string;

  linkedin?: string;

  website?: string;

  phone?: string;

  location?: string;

  bio?: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;

}

const UserSchema = new Schema<IUser>(
  {

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'ADMIN'
    },

    designation: {
      type: String,
      default: ''
    },

    profileImage: {
      type: String,
      default: ''
    },

    github: {
      type: String,
      default: ''
    },

    linkedin: {
      type: String,
      default: ''
    },

    website: {
      type: String,
      default: ''
    },

    phone: {
      type: String,
      default: ''
    },

    location: {
      type: String,
      default: ''
    },

    bio: {
      type: String,
      default: ''
    },

    isActive: {
      type: Boolean,
      default: true
    }

  },
  schemaOptions
);

UserSchema.index({
  email: 1
}, {
  unique: true
});

export default model<IUser>('User', UserSchema);