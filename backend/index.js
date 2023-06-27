const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

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

const app = express();

app.use(express.json());

app.use('/api', routes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})