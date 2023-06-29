const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fs = require('fs')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { authenticateJWT } = require('./src/authentication/authMiddleware');

// Init .env configuration
dotenv.config()

/**
 * Express App
 */
const app = express()

app.use(cors())
app.use(express.json())

// For each file of the routes folder, we will add a new route to our Express app.
// This will allow us to separate our routes into different files without having to
// manually add each route to our Express app.
for (file of fs.readdirSync('./src/routes')) {
  const routePath = `/api/${file.split('.')[0].toLowerCase()}`;

  if (routePath !== '/api/users') {
    app.use(routePath, authenticateJWT, require(`./src/routes/${file}`));
  } else {
    app.use(routePath, require(`./src/routes/${file}`));
  }
}

/**
 * End Express App Declaration
 */

/**
 * Database Connection
 */
const mongoString = process.env.MONGO_CONNECTION_STRING

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected')
})
/**
 * End Database Connection
 */

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

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

/**
 * End Swagger Documentation
 */

app.listen(3000, () => {
  console.log(`Server Started at ${3000} `)
})
