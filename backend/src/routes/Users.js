const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

const User = require('../models/User')

/**
 * @swagger
 * /users/login:
 *   get:
 *     summary: Find a user by username or email and password
 *     tags:
 *       - users
 *     description: Retrieve a user from the database based on the provided username or email and password.
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: The username of the user.
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: The email address of the user.
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         description: The password of the user.
 *     responses:
 *       200:
 *         description: User found. Returns the user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Please provide a username or email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error. An error occurred while querying the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/login', userController.login)

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - users
 *     description: Create a new user account with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully registered the user.
 *       400:
 *         description: Bad request. An error occurred while registering the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.post('/register', userController.register)

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update user information
 *     tags:
 *       - users
 *     description: Update user information by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user to be updated
 *               newInfo:
 *                 type: object
 *                 description: Updated information for the user
 *     responses:
 *       201:
 *         description: User information successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 _id:
 *                   type: string
 *       400:
 *         description: An error occurred while updating the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: User does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.put('/update/:id', userController.updateUser)

module.exports = router
