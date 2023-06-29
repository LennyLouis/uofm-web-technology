const Course = require('../models/Course')

const getCourses = async (req, res) => {
  try {
    console.log()
    const courses = await Course.find()

    if (!courses) return res.status(404).json({ message: 'No courses found' })

    return res.status(200).json(courses)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const createCourse = async (req, res) => {
  const { name, description, content, tools } = req.body

  try {
    // Check if a course with the same name already exists
    const existingCourse = await Course.findOne({ name })
    if (existingCourse) return res.status(409).json({ message: 'This course already exists' })

    // Create a course
    const newCourse = new Course({
      name,
      description,
      content,
      tools
    })

    // Save the course to the database
    await newCourse.save()

    return res.status(201).json({ success: true, _id: newCourse._id })
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while creating the course', error: error })
  }
}

const getCourseById = async (req, res) => {
  const { id } = req.body

  try {
    // Check if a course with the same id already exists
    const existingCourse = await Course.findById(id)
    if (!existingCourse) return res.status(404).json({ message: 'This course does not exist' })

    return res.status(200).json(existingCourse)
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while getting the course', error: error })
  }
}

const updateCourse = async (req, res) => {
  const { id, newInfo } = req.body

  try {
    // Check if any of the image properties were sent
    if (!name && !description && !content && !tools) return res.status(400).json({ message: 'No course information was provided' })

    // Check if a course with the same id already exists
    const existingCourse = await Course.findById(id)
    if (!existingCourse) return res.status(404).json({ message: 'This course does not exist' })

    // Update the course
    Object.keys(newInfo).forEach(el => existingCourse[el] = newInfo[el])

    // Save the course to the database
    await existingCourse.save()

    return res.status(200).json({ success: true, _id: existingCourse._id })
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while updating the course', error: error })
  }
}

const deleteCourse = async (req, res) => {
  const { id } = req.body

  try {
    // Find the existing course by ID
    const existingCourse = await Course.findById(id)
    if (!existingCourse) return res.status(404).json({ message: 'This course does not exist' })

    // Delete the course
    await existingCourse.deleteOne()

    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while deleting the course', error: error })
  }
}

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
}