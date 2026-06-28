import path from 'path';
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.production') });

const MONGO_URI = process.env.STORAGE_MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'portfolio_ai';

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

export const connectDatabase = async (): Promise<typeof mongoose> => {
  if (globalWithMongoose.mongoose?.conn) {
    return globalWithMongoose.mongoose.conn as typeof mongoose;
  }

  if (!MONGO_URI) {
    throw new Error("STORAGE_MONGO_URI is missing in .env");
  }

  if (!globalWithMongoose.mongoose?.promise) {
    globalWithMongoose.mongoose = {
      conn: null,
      promise: mongoose.connect(MONGO_URI, {
        dbName: DB_NAME,
        serverSelectionTimeoutMS: 5000,
      }),
    };
  }

  try {
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    console.log(` MongoDB Connected to database "${DB_NAME}"`);
    return globalWithMongoose.mongoose.conn as typeof mongoose;
  } catch (error) {
    globalWithMongoose.mongoose.promise = null;
    console.error(" MongoDB Connection Failed");
    console.error(error);
    throw error;
  }
};

export const connectDB = connectDatabase;

export default connectDatabase;