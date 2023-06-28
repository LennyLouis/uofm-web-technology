const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const courses = require('./src/routes/Courses');
const images = require('./src/routes/Images');
const users = require('./src/routes/Users');


/**
 * Express App
 */
const app = express();

app.use(express.json());

app.use('/api/courses', courses);
app.use('/api/images', images);
app.use('/api/users', users);
/**
 * End Express App Declaration
 */

/**
 * Database Connection
 */
const mongoString = 'mongodb://group_02:group_02@umd-esiea-web.cis.umd.umich.edu:8039/group_02';

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
/**
 * End Database Connection
 */

/**
 * Swagger Documentation
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UMD ESIEA API",
      version: "1.0.0",
      description: "UMD ESIEA API",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ]
  },
  apis: [
    "./src/routes/*.js",
    "./src/models/*.js"]
};

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

/**
 * End Swagger Documentation
 */


app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})