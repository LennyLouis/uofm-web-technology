const express = require('express');

const router = express.Router()

const Course = require('../models/Course');

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - courses
 *     description: Retrieve all courses.
 *     responses:
 *       200:
 *         description: Courses successfully retrieved.
 *       404:
 *         description: No courses found.
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
    const courses = await Course.find();

    if (!courses) return res.status(404).json({ message: 'No courses found' });

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags:
 *       - courses
 *     description: Create a new course with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course successfully created.
 *       400:
 *         description: Bad request. An error occurred while creating the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.post('/', async (req, res) => {
  const { name, description, content, tools } = req.body;

  try {
    // Check if a course with the same name already exists
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) return res.status(409).json({ message: 'This course already exists' });

    // Create a course
    const newCourse = new Course({
      name,
      description,
      content,
      tools
    })

    // Save the course to the database
    await newCourse.save();

    return res.status(200).json({ message: 'Course successfully created' });
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while creating the course', error: error });
  }
})

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags:
 *       - courses
 *     description: Retrieve a course by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the course
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course successfully retrieved.
 *       404:
 *         description: Course not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. An error occurred while getting the course.
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
    // Check if a course with the same id already exists
    const existingCourse = await Course.findById(id);
    if (!existingCourse) return res.status(404).json({ message: 'This course does not exist' });

    return res.status(200).json(existingCourse);
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while getting the course', error: error });
  }
})

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags:
 *       - courses
 *     description: Update a course by its ID with the provided information.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the course
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course successfully updated.
 *       404:
 *         description: Course not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. An error occurred while updating the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, content, tools } = req.body;

  try {
    // Check if any of the image properties were sent
    if (!name && !description && !content && !tools) return res.status(400).json({ message: 'No course information was provided' });

    // Check if a course with the same id already exists
    const existingCourse = await Course.findById(id);
    if (!existingCourse) return res.status(404).json({ message: 'This course does not exist' });

    // Update the course
    if (name) existingCourse.name = name;
    if (description) existingCourse.description = description;
    if (content) existingCourse.content = content;
    if (tools) existingCourse.tools = tools;

    // Save the course to the database
    await existingCourse.save();

    return res.status(200).json({ message: 'Course successfully updated' });
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while updating the course', error: error });
  }
})

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags:
 *       - courses
 *     description: Delete a course by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the course
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course successfully deleted.
 *       404:
 *         description: Course not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. An error occurred while deleting the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the existing course by ID
    const existingCourse = await Course.findById(id);
    if (!existingCourse) return res.status(404).json({ message: 'This course does not exist' });

    // Delete the course
    await existingCourse.deleteOne();

    return res.status(200).json({ message: 'Course successfully deleted' });
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while deleting the course', error: error });
  }
})

module.exports = router;