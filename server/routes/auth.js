const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  logout,
  forgotPassword, 
  resetPassword, 
  verifyEmail,
  getCurrentUser 
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const refreshToken = require('../middleware/refreshToken');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);
router.get('/verify-email/:verificationToken', verifyEmail);

// Protected routes
router.use(refreshToken); // Apply token refresh to all protected routes
router.use(protect);
router.post('/logout', logout);
router.get('/me', getCurrentUser);

module.exports = router;