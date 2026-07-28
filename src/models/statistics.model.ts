import mongoose, { Schema, Document } from 'mongoose';
import { toJSONPlugin } from '../plugins/to-json.plugin';

export interface IStatistics extends Document {
  title: string;
  value: string;
  description: string;
  icon: string;
}

const statisticsSchema = new Schema<IStatistics>(
  {
    title: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

toJSONPlugin(statisticsSchema);

const Statistics = mongoose.model<IStatistics>('Statistics', statisticsSchema);

export default Statistics;
