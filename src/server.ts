import app from "./app";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};
startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});