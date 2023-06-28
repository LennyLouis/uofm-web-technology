const express = require('express');

const router = express.Router()

const Course = require('../schemas/Course');

router.post('/', async (req, res) => {
  const { name, description, content, tools?} = req.body;

  try {
    // Check if a course with the same name already exists
    const existingCourse = await Course.findOne({ name });

    if (existingCourse) {
      // Course with the same name already exists
      return res.status(409).json({ message: 'This course already exists' });
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
    })
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while creating the course', error: error });
  }
})


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