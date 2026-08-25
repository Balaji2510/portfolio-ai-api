import * as dotenv from 'dotenv';
dotenv.config();

import app from "../src/app";
import { connectDB } from "../src/config/database";

// Keep track of connection state for serverless execution
let isConnected = false;

export default async (req: any, res: any) => {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }
  } catch (error) {
    console.error("Database connection failed during Vercel function invocation:", error);
    return res.status(500).json({ 
      success: false, 
      message: "API Startup Error: Failed to connect to database.",
      error: error instanceof Error ? error.message : "Unknown database error"
    });
  }

  // Pass request to Express app
  return app(req, res);
};
