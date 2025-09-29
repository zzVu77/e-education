import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import swaggerJSDoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "RESTful API documentation generated with Swagger",
    },
    servers: [
      {
        url: `http://localhost:${Number(process.env.PORT) || 3000}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
