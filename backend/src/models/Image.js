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
 *         user:
 *           type: ObjectId
 *           description: The user who uploaded the image.
 *     PaginatedImagesResponse:
 *       type: object
 *       properties:
 *         totalItems:
 *           type: integer
 *           description: Total number of items.
 *         currentPage:
 *           type: integer
 *           description: Current page number.
 *         pageSize:
 *           type: integer
 *           description: Number of items in the current page.
 *         totalPages:
 *           type: integer
 *           description: Total number of pages.
 *         hasNextPage:
 *           type: boolean
 *           description: Indicates if there is a next page.
 *         nextPage:
 *           type: integer
 *           description: Next page number.
 *         hasPrevPage:
 *           type: boolean
 *           description: Indicates if there is a previous page.
 *         prevPage:
 *           type: integer
 *           description: Previous page number.
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Image'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
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
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Image', imageSchema)
