const express = require('express');
const router = express.Router();
const { 
  getResumes, 
  getResumeById, 
  createResume, 
  updateResume, 
  deleteResume,
  getResumeVersions,
  createResumeVersion,
  restoreResumeVersion,
  generatePDF,
  optimizeWithAI,
  convertToPortfolio
} = require('../controllers/resumes');
const { protect } = require('../middleware/auth');

// Public routes
router.route('/:id/pdf').get(generatePDF);

// Protected routes
router.use(protect);
router.route('/').get(getResumes).post(createResume);
router.route('/:id').get(getResumeById).put(updateResume).delete(deleteResume);
router.route('/:id/versions').get(getResumeVersions).post(createResumeVersion);
router.route('/:id/versions/:versionId/restore').post(restoreResumeVersion);
router.route('/:id/optimize').post(optimizeWithAI);
router.route('/:id/portfolio').post(convertToPortfolio);

module.exports = router;