const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fs = require('fs')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

/**
 * Express App
 */
const app = express()

app.use(cors())
app.use(express.json())

// For each file of the routes folder, we will add a new route to our Express app.
// This will allow us to separate our routes into different files without having to
// manually add each route to our Express app.
for (file of fs.readdirSync('./src/routes'))
  app.use(`/api/${file.split('.')[0].toLowerCase()}`, require(`./src/routes/${file}`))

/**
 * End Express App Declaration
 */

/**
 * Database Connection
 */
const mongoString = 'mongodb://group_02:group_02@umd-esiea-web.cis.umd.umich.edu:8039/group_02'

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
