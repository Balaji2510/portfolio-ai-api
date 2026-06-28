import { Schema, model, Document } from 'mongoose';

import { auditPlugin, paginationPlugin, slugPlugin, softDeletePlugin, toJSONPlugin } from '../plugins';
import { schemaOptions } from '../utils/schema-options';

export interface IProject extends Document {

  title: string;

  slug: string;

  shortDescription: string;

  description: string;

  technologies: string[];

  githubUrl: string;

  liveUrl: string;

  thumbnail: string;

  gallery: string[];

  architectureImage?: string;

  featured: boolean;

  status: 'ACTIVE' | 'IN_PROGRESS' | 'ARCHIVED';

  tags: string[];

  startDate?: Date;

  endDate?: Date;

  displayOrder: number;

  createdAt: Date;

  createdBy: Schema.Types.ObjectId;

  updatedAt: Date;

}

const ProjectSchema = new Schema<IProject>(
  {

    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    technologies: {
      type: [String],
      default: []
    },

    githubUrl: {
      type: String,
      default: ''
    },

    liveUrl: {
      type: String,
      default: ''
    },

    thumbnail: {
      type: String,
      default: ''
    },

    gallery: {
      type: [String],
      default: []
    },

    architectureImage: {
      type: String,
      default: ''
    },

    featured: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: [
        'ACTIVE',
        'IN_PROGRESS',
        'ARCHIVED'
      ],
      default: 'ACTIVE'
    },

    tags: {
      type: [String],
      default: []
    },

    startDate: {
      type: Date
    },

    endDate: {
      type: Date
    },

    displayOrder: {
      type: Number,
      default: 1
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }

  },
  schemaOptions
);

ProjectSchema.plugin(paginationPlugin);
ProjectSchema.plugin(softDeletePlugin);
ProjectSchema.plugin(slugPlugin);
ProjectSchema.plugin(toJSONPlugin);
ProjectSchema.plugin(auditPlugin);

ProjectSchema.index({
  slug: 1
}, {
  unique: true
});

ProjectSchema.index({
  featured: 1
});

ProjectSchema.index({
  status: 1
});

export default model<IProject>(
  'Project',
  ProjectSchema
);