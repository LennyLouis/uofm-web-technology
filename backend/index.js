const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const { authenticateJWT } = require('./src/authentication/authMiddleware');

// Import all configuration files
const swagger = require('./config/swagger')
const database = require('./config/database')

// Init Express app
const app = express()

app.use(cors())
app.use(express.json())
swagger(app)

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


app.listen(3000, () => {
  console.log(`Server Started at ${3000} `)
})
