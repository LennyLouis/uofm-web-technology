const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

/**
 * Swagger Documentation
 */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UMD ESIEA API',
      version: '1.0.0',
      description: 'UMD ESIEA API'
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/models/*.js']
}

const specs = swaggerJsdoc(options)

module.exports = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs)
  )
}

/**
 * End Swagger Documentation
 */