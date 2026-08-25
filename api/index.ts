import * as dotenv from 'dotenv';
dotenv.config();

import app from "../src/app";
import { connectDB } from "../src/config/database";

// Connect to database
connectDB().catch(console.dir);

export default app;
