const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  updateProfile, 
  updatePassword, 
  deleteAccount, 
  uploadProfilePicture 
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

// Protected routes
router.use(protect);
router.get('/me', getProfile);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);
router.delete('/', deleteAccount);
router.post('/profile-picture', uploadProfilePicture);

module.exports = router;