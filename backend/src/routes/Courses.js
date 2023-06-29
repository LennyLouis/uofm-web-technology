const express = require('express')
const courseController = require('../controllers/courseController')

const router = express.Router()

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

router.get('/', courseController.getCourses)

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

router.post('/', courseController.createCourse)

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

router.get('/:id', courseController.getCourseById)

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

router.put('/:id', courseController.updateCourse)

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

router.delete('/', courseController.deleteCourse)

module.exports = router
