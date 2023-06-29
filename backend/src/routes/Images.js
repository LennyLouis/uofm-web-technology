const express = require('express')
const imageController = require('../controllers/imageController')

const router = express.Router()

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Get paginated images
 *     tags:
 *       - images
 *     description: Retrieve paginated images based on query parameters.
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           default: createdAt
 *       - name: order
 *         in: query
 *         schema:
 *           type: string
 *           default: asc
 *       - name: select
 *         in: query
 *         schema:
 *           type: string
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *       - name: user
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated images successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedImagesResponse'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Page does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', imageController.getPaginatedImages)

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Create a new image
 *     tags:
 *       - images
 *     description: Create a new image with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Image'
 *     responses:
 *       200:
 *         description: Image successfully created.
 *       409:
 *         description: Image already exists.
 *       400:
 *         description: An error occurred while saving the image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */

router.post('/', imageController.createImage)

/**
 * @swagger
 * /images/{id}:
 *   put:
 *     summary: Update an image by ID
 *     tags:
 *       - images
 *     description: Update the properties of an image in the database based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the image to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Image'
 *     responses:
 *       200:
 *         description: Image successfully updated.
 *       404:
 *         description: Image not found.
 *       400:
 *         description: An error occurred while updating the image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */

router.put('/:id', imageController.updateImage)

/**
 * @swagger
 * /images:
 *   delete:
 *     summary: Delete an image by ID
 *     tags:
 *       - images
 *     description: Delete an image from the database based on its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the image to delete.
 *     responses:
 *       200:
 *         description: Image successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Image not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: An error occurred while deleting the image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */

router.delete('/', imageController.deleteImage)

module.exports = router
