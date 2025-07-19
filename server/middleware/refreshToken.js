const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to refresh JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const refreshToken = async (req, res, next) => {
  try {
    // Get token from request
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if token is about to expire (less than 1 day remaining)
      const tokenExp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      const oneDayInSeconds = 24 * 60 * 60;
      
      // If token is about to expire, issue a new one
      if (tokenExp - now < oneDayInSeconds) {
        // Get user from token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        // Generate new token
        const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d'
        });
        
        // Set new token in response header
        res.setHeader('x-auth-token', newToken);
      }
      
      next();
    } catch (error) {
      // If token is invalid or expired, continue without refreshing
      next();
    }
  } catch (error) {
    console.error('Token refresh error:', error);
    next();
  }
};

module.exports = refreshToken;