import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { setupSwagger } from './config/swager';
import { errorHandler } from "./middleware/error.middleware";

import authRoutes from "./modules/auth/auth.routes";
import adminRoutes from "./modules/admin/admin.routes";
import portfolioRoutes from "./modules/portfolio/portfolio.routes";
import contactRoutes from "./modules/contact/contact.routes";
import aiRoutes from "./modules/ai/ai.routes";
import resumeRoutes from "./modules/upload/resume.routes";

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));
setupSwagger(app);

// Routes
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', portfolioRoutes);
app.use('/api', contactRoutes);
app.use('/api', aiRoutes);
app.use('/api', resumeRoutes);
app.get("/", (req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PortfolioAI API</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 32px;
        background: #f5f7fb;
        color: #111;
      }
      header {
        margin-bottom: 24px;
      }
      h1 {
        margin: 0 0 8px;
      }
      .card {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        padding: 24px;
        max-width: 720px;
      }
      dt {
        font-weight: 700;
        margin-top: 16px;
      }
      dd {
        margin: 4px 0 0 0;
      }
      .note {
        margin-top: 20px;
        padding: 14px 16px;
        background: #eef4ff;
        border-left: 4px solid #3b82f6;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <header>
        <h1>PortfolioAI API</h1>
        <p>Welcome to the PortfolioAI API documentation page.</p>
      </header>

      <dl>
        <dt>POST /api/auth/register</dt>
        <dd>Register a new user account</dd>
        <dt>POST /api/auth/login</dt>
        <dd>Login with email and password</dd>
        <dt>GET /api/projects</dt>
        <dd>Get all projects</dd>
        <dt>GET /api/skills</dt>
        <dd>Get all skills</dd>
        <dt>GET /api/experience</dt>
        <dd>Get all experiences</dd>
        <dt>GET /api/education</dt>
        <dd>Get all educations</dd>
        <dt>POST /api/contact</dt>
        <dd>Submit a contact form</dd>
        <dt>POST /api/chat</dt>
        <dd>Create a new chat (requires authentication)</dd>
        <dt>POST /api/resume/upload</dt>
        <dd>Upload a PDF resume</dd>
      </dl>

      <section class="note">
        <strong>Note:</strong> If additional routes are registered in the API, add them to this page for easy discovery.
      </section>
    </div>
  </body>
</html>`);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});


// Error Handler (must be last)
app.use(errorHandler);

export default app;