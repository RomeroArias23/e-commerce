// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'A REST API for an e-commerce application',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update with your actual server URL
        description: 'Local development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Point to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
