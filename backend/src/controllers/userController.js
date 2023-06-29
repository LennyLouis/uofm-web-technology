const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    return res.status(400).json({ message: 'Please provide a username or email' });
  }

  const query = username ? { username } : { email };

  try {
    const user = await User.findOne(query);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // User found and password is valid, generate the token
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
          success: true,
          user: { ...user.toObject(), password: undefined },
          accessToken: token,
        });
      }
    }

    // User not found or password is invalid
    return res.status(404).json({ message: 'Invalid username/email or password' });
  } catch (error) {
    // Error occurred while querying the database
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const register = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body

  try {
    // Check if a user with the same username or email already exists
    const existingUserUsername = await User.findOne({ username })
    if (existingUserUsername) return res.status(409).json({ message: 'Username already exists' })
    const existingUserMail = await User.findOne({ email })
    if (existingUserMail) return res.status(409).json({ message: 'Email already exists' })

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword
    })

    // Save the new user to the database
    await newUser.save()

    res.status(201).json({ success: true, _id: newUser._id })
  } catch (error) {
    res.status(400).json({ message: 'An error occurred while creating the user', error: error })
  }
}

const updateUser = async (req, res) => {
  const id = req.params
  const { user } = req

  try {
    // Check if user is authorized to update the user
    if (user._id == id || user.role == 'admin') {
      // Check if a user with the same user id already exists
      const existingUser = await User.findOne({ _id: id })
      if (!existingUser) return res.status(409).json({ message: 'User does not exist' })

      // Update the user
      Object.keys(req.body).forEach(el => existingUser[el] = req.body[el])

      // Save the updated user to the database
      await existingUser.save()

      res.status(201).json({ success: true, user: existingUser })
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(400).json({ message: 'An error occurred while updating the user', error: error })
  }
}

module.exports = {
  login,
  register,
  updateUser,
};
