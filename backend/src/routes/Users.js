const express = require('express')

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
router.get('/login', async (req, res) => {
  const { username, email, password } = req.body

  try {
    let user

    if (username) {
      // Find user by username and password
      user = await User.findOne({ username, password })
    } else if (email) {
      // Find user by email and password
      user = await User.findOne({ email, password })
    } else {
      return res.status(400).json({ message: 'Please provide a username or email' })
    }

    if (user) {
      // User found
      return res.status(200).json(user)
    } else {
      // User not found
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Error occurred while querying the database
    return res.status(500).json({ message: 'Internal server error' })
  }
})

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

router.post('/register', async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body

  try {
    // Check if a user with the same username or email already exists
    const existingUserUsername = await User.findOne({ username })
    if (existingUserUsername) return res.status(409).json({ message: 'Username already exists' })
    const existingUserMail = await User.findOne({ email })
    if (existingUserMail) return res.status(409).json({ message: 'Email already exists' })

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      role: 'user',
      status: 'active'
    })

    // Save the new user to the database
    await newUser.save()

    res.status(200).json({ message: 'User successfully registered' })
  } catch (error) {
    res.status(400).json({ message: 'An error occurred while creating the user', error: error })
  }
})

module.exports = router
