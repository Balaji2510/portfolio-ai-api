import { Schema, model, Document } from 'mongoose';

import { schemaOptions } from '../utils/schema-options';

export interface ISkill extends Document {

  name: string;

  category:
    | 'Frontend'
    | 'Backend'
    | 'Database'
    | 'Cloud'
    | 'DevOps'
    | 'AI'
    | 'Tools'
    | 'Mobile'
    | 'Testing'
    | 'Other';

  level: number;

  yearsOfExperience: number;

  icon: string;

  color: string;

  featured: boolean;

  displayOrder: number;

  status: 'ACTIVE' | 'INACTIVE';

  createdAt: Date;

  updatedAt: Date;

}

const SkillSchema = new Schema<ISkill>(
  {

    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    category: {
      type: String,
      enum: [
        'Frontend',
        'Backend',
        'Database',
        'Cloud',
        'DevOps',
        'AI',
        'Tools',
        'Mobile',
        'Testing',
        'Other'
      ],
      required: true
    },

    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0
    },

    icon: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: '#4F46E5'
    },

    featured: {
      type: Boolean,
      default: false
    },

    displayOrder: {
      type: Number,
      default: 1
    },

    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    }

  },
  schemaOptions
);

SkillSchema.index({
  category: 1
});

SkillSchema.index({
  featured: 1
});

SkillSchema.index({
  displayOrder: 1
});

SkillSchema.index({
  status: 1
});

export default model<ISkill>(
  'Skill',
  SkillSchema
);