const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Init .env configuration
dotenv.config()

/**
 * Database Connection
 */
const mongoString = process.env.MONGO_DB_URI

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