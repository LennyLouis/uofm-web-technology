/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the user.
 *         lastname:
 *           type: string
 *           description: The last name of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: {
    required: true,
    type: String
  },
  lastname: {
    required: true,
    type: String
  },
  username: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  role: {
    required: true,
    type: String
  },
  status: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)
