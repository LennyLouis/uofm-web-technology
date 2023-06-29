const express = require('express')
const imageController = require('../controllers/imageController')

const router = express.Router()

const Image = require('../models/Image')

/**
 * @swagger
 * /api/images:
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

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, description, url } = req.body

  try {
    // Check if any of the image properties were sent
    if (!name && !description && !url) return res.status(400).json({ message: 'No image properties were provided' })

    // Find the existing image by ID
    const existingImage = await Image.findById(id)
    if (!existingImage) return res.status(404).json({ message: 'Image not found' })

    // Update the image properties if any of them was sent
    if (name) existingImage.name = name
    if (description) existingImage.description = description
    if (url) existingImage.url = url

    // Save the updated image to the database
    await existingImage.save()

    return res.status(200).json({ success: true, _id: existingImage._id })
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while updating the image', error: error })
  }
})

/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     summary: Delete an image by ID
 *     tags:
 *       - images
 *     description: Delete an image from the database based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the image to delete.
 *     responses:
 *       200:
 *         description: Image successfully deleted.
 *       404:
 *         description: Image not found.
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Find the existing image by ID
    const existingImage = await Image.findById(id)
    if (!existingImage) return res.status(404).json({ message: 'Image not found' })

    // Delete the image from the database
    await existingImage.deleteOne()

    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while deleting the image', error: error })
  }
})

module.exports = router
