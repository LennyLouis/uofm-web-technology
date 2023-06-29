const Image = require('../models/Image');

// Get paginated images of the user
const getPaginatedImages = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;
  const sortField = req.query.sort || 'createdAt';
  const sortOrder = req.query.order === 'asc' ? 1 : -1;
  const selectFields = req.query.select ? req.query.select.split(',') : [];
  const search = req.query.search;

  if (page < 1) {
    res.status(400);
    throw new Error("Page must be at least 1");
  }

  if (limit < 1) {
    res.status(400);
    throw new Error("Limit must be at least 1");
  }

  const userFilter = req.query.user ? { user: req.query.user } : { user: req.user._id };
  let filter = search
    ? {
      $or: [
        { name: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
        { url: { $regex: new RegExp(search, 'i') } },
      ],
      ...userFilter,
    }
    : userFilter;

  try {
    const [totalDocuments, images] = await Promise.all([
      Image.countDocuments(filter),
      Image.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skipIndex)
        .limit(limit)
        .select(selectFields),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;

    if (page > totalPages) {
      res.status(404);
      throw new Error('Page does not exist');
    }

    res.status(200).json({
      totalItems: totalDocuments,
      currentPage: page,
      pageSize: images.length,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      nextPage: nextPage,
      hasPrevPage: hasPrevPage,
      prevPage: prevPage,
      items: images,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error });
  }
};

// Create a image
const createImage = async (req, res) => {
  const { name, description, url } = req.body

  try {
    // Check if a image with the same name already exists
    const existingImage = await Image.findOne({ name })
    if (existingImage) return res.status(409).json({ message: 'Image already exists' })

    console.log(req.user)

    // Create a image
    const newImage = new Image({
      name,
      description,
      url,
      user: req.user._id
    })

    // Save the image to the database
    await newImage.save()

    return res.status(201).json({ success: true, _id: newImage._id })
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while saving the image', error: error })
  }
}

// Update a image
const updateImage = async (req, res) => {
  const { id } = req.params
  const { name, description, url } = req.body

  try {
    // Check if any of the image properties were sent
    if (!name && !description && !url) return res.status(400).json({ message: 'No image properties were provided' })

    // Find the existing image by ID
    const existingImage = await Image.findById(id)
    if (!existingImage) return res.status(404).json({ message: 'Image not found' })

    // Update the image properties if any of them was sent
    Object.keys(req.body).forEach(el => existingImage[el] = req.body[el])

    // Save the updated image to the database
    await existingImage.save()

    return res.status(200).json({ success: true, _id: existingImage._id })
  } catch (error) {
    return res.status(400).json({ message: 'An error occurred while updating the image', error: error })
  }
}

// Delete a image
const deleteImage = async (req, res) => {
  const { id } = req.body

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
}

module.exports = {
  getPaginatedImages,
  createImage,
  updateImage,
  deleteImage,
};
