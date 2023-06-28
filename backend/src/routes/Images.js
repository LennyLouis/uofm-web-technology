const express = require('express');

const router = express.Router()

const Image = require('../models/Image');

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Get all images
 *     tags:
 *       - images
 *     description: Retrieve all images.
 *     responses:
 *       200:
 *         description: Images successfully retrieved.
 *       404:
 *         description: No images found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get('/', async (req, res) => {
  try {
    const images = await Image.find();

    if (!images) return res.status(404).json({ message: 'No images found' });

    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Get an image by ID
 *     tags:
 *       - images
 *     description: Retrieve an image by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the image.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image successfully retrieved.
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
 *         description: An error occurred while getting the image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if a image with the same id already exists
    const existingImage = await Image.findById(id);
    if (!existingImage) return res.status(404).json({ message: 'This image does not exist' });

    return res.status(200).json(existingImage);
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while getting the course', error: error });
  }
})

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


router.post('/', async (req, res) => {
  const { name, description, url } = req.body;

  try {
    // Check if a image with the same name already exists
    const existingImage = await Image.findOne({ name });
    if (existingImage) return res.status(409).json({ message: 'Image already exists' });

    // Create a image
    const newImage = new Image({
      name,
      description,
      url
    })

    // Save the image to the database
    await newImage.save();

    return res.status(200).json({ message: 'Image successfully created' });
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while saving the image', error: error });
  }
})

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
  const { id } = req.params;
  const { name, description, url } = req.body;

  try {
    // Check if any of the image properties were sent
    if (!name && !description && !url) return res.status(400).json({ message: 'No image properties were provided' });

    // Find the existing image by ID
    const existingImage = await Image.findById(id);
    if (!existingImage) return res.status(404).json({ message: 'Image not found' });

    // Update the image properties if any of them was sent
    if (name) existingImage.name = name;
    if (description) existingImage.description = description;
    if (url) existingImage.url = url;

    // Save the updated image to the database
    await existingImage.save();

    return res.status(200).json({ message: 'Image successfully updated' });
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while updating the image', error: error });
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
  const { id } = req.params;

  try {
    // Find the existing image by ID
    const existingImage = await Image.findById(id);
    if (!existingImage) return res.status(404).json({ message: 'Image not found' });

    // Delete the image from the database
    await existingImage.deleteOne();

    return res.status(200).json({ message: 'Image successfully deleted' });
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while deleting the image', error: error });
  }
})

module.exports = router;