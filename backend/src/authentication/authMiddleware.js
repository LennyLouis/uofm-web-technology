const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (req.path === '/login' || req.path === '/register') {
    return next();
  }

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateJWT };