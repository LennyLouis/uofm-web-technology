/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the course.
 *         description:
 *           type: string
 *           description: The description of the course.
 *         content:
 *           type: array
 *           items:
 *             type: string
 *           description: The content of the course.
 *         tools:
 *           type: array
 *           items:
 *             type: string
 *           description: The tools used in the course (optional).
 */

const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: [String]
  },
  tools: {
    required: false,
    type: [String]
  }
})

module.exports = mongoose.model('Course', courseSchema)
