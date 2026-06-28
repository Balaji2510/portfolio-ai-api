import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'PortfolioAI API',
      version: '1.0.0',
      description: 'PortfolioAI Backend API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    './src/modules/**/*.ts',
    './src/routes/**/*.ts',
  ],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customSiteTitle: 'PortfolioAI API Docs',
    })
  );
}