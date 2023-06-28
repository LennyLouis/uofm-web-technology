/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the image.
 *         description:
 *           type: string
 *           description: The description of the image.
 *         url:
 *           type: string
 *           description: The URL of the image.
 */
const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  url: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('Image', imageSchema)
