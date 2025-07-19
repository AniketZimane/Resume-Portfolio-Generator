const express = require('express');
const router = express.Router();
const { 
  getPortfolioByUsername, 
  updatePortfolio, 
  deletePortfolio, 
  getPortfolioStats,
  updatePortfolioTheme
} = require('../controllers/portfolios');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/:username', getPortfolioByUsername);

// Protected routes
router.use(protect);
router.route('/').put(updatePortfolio).delete(deletePortfolio);
router.get('/stats', getPortfolioStats);
router.put('/theme', updatePortfolioTheme);

module.exports = router;