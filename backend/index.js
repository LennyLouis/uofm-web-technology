const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
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
for (file of fs.readdirSync('./src/routes')) app.use(`/api/${file.split('.')[0].toLowerCase()}`, authenticateJWT, require(`./src/routes/${file}`))

port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server Started at ${port} `)
})
