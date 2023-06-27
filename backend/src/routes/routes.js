const express = require('express');

const router = express.Router()

const User = require('../schemas/User');

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
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

router.post('/users/register', async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      // User with the same username or email already exists
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      role: 'user',
      status: 'active'
    });

    // Save the new user
    const savedUser = await newUser.save();

    res.status(200).json({ message: 'User successfully registered' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/**
 * @swagger
 * /users/login:
 *   get:
 *     summary: Find a user by username or email and password
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
router.get('/users/login', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user;

    if (username) {
      // Find user by username and password
      user = await User.findOne({ username, password });
    } else if (email) {
      // Find user by email and password
      user = await User.findOne({ email, password });
    } else {
      return res.status(400).json({ message: 'Please provide a username or email' });
    }

    if (user) {
      // User found
      return res.status(200).json(user);
    } else {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    // Error occurred while querying the database
    return res.status(500).json({ message: 'Internal server error' });
  }
});



//Post Method
router.post('/post', (req, res) => {
  res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
  res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
  res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
  res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})

module.exports = router;