const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

// @desc    Get portfolio by username
// @route   GET /api/portfolios/:username
// @access  Public
exports.getPortfolioByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const portfolio = await Portfolio.findOne({ user: user._id, isPublished: true })
      .populate('user', 'username name email profilePicture')
      .populate('resume');
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    // Increment view count
    await Portfolio.findByIdAndUpdate(portfolio._id, { $inc: { viewCount: 1 } });
    
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update portfolio
// @route   PUT /api/portfolios
// @access  Private
exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      portfolio._id,
      {
        theme: req.body.theme || portfolio.theme,
        sections: req.body.sections || portfolio.sections,
        customSections: req.body.customSections || portfolio.customSections,
        seo: req.body.seo || portfolio.seo,
        analytics: req.body.analytics || portfolio.analytics,
        social: req.body.social || portfolio.social,
        isPublished: req.body.isPublished !== undefined ? req.body.isPublished : portfolio.isPublished,
        lastPublished: req.body.isPublished ? Date.now() : portfolio.lastPublished
      },
      { new: true }
    );
    
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolios
// @access  Private
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    await portfolio.deleteOne();
    
    // Update resume to indicate it no longer has a portfolio
    await Resume.findByIdAndUpdate(
      portfolio.resume,
      {
        hasPortfolio: false,
        portfolioUrl: ''
      }
    );
    
    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get portfolio stats
// @route   GET /api/portfolios/stats
// @access  Private
exports.getPortfolioStats = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    // In a real implementation, we would calculate more detailed stats
    const stats = {
      viewCount: portfolio.viewCount,
      lastPublished: portfolio.lastPublished,
      isPublished: portfolio.isPublished
    };
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update portfolio theme
// @route   PUT /api/portfolios/theme
// @access  Private
exports.updatePortfolioTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    
    if (!theme) {
      return res.status(400).json({ message: 'Theme is required' });
    }
    
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      portfolio._id,
      { theme },
      { new: true }
    );
    
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};