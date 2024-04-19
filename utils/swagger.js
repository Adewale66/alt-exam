import { config, logger } from './config.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Blog API Docs",
      version : "0.1.0",
      contact: {
        name: "Adewale Kujore",
        url: "https://github.com/Adewale66",
      },
    },
    components: {
      securitySchemas: {
        bearerAuth: 'http',
        scheme: 'bearer',
        bearerFormat: "JWT"
      }
    },
    security : [
      {
        bearerAuth: [],
      }
    ],
  },
  apis: ["./routes/*.js", './models/*.js'],
};
const specification = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specification))

  app.get("docs.json", (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specification);
  })
  logger.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs;
