const Resume = require('../models/Resume');
const ResumeVersion = require('../models/ResumeVersion');
const Portfolio = require('../models/Portfolio');
const { optimizeResume } = require('../utils/aiService');

// @desc    Get all resumes for a user
// @route   GET /api/resumes
// @access  Private
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get a resume by ID
// @route   GET /api/resumes/:id
// @access  Private
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Check if the resume belongs to the user
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this resume' });
    }
    
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
exports.createResume = async (req, res) => {
  try {
    const resumeData = {
      ...req.body,
      user: req.user.id
    };
    
    const resume = await Resume.create(resumeData);
    
    // Create initial version
    await ResumeVersion.create({
      resume: resume._id,
      user: req.user.id,
      versionNumber: 1,
      name: 'Initial Version',
      description: 'First version of the resume',
      data: resumeData
    });
    
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
exports.updateResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Check if the resume belongs to the user
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this resume' });
    }
    
    // Update resume
    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, currentVersion: resume.currentVersion + 1 },
      { new: true }
    );
    
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Check if the resume belongs to the user
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this resume' });
    }
    
    // Delete all versions
    await ResumeVersion.deleteMany({ resume: resume._id });
    
    // Delete portfolio if exists
    if (resume.hasPortfolio) {
      await Portfolio.findOneAndDelete({ resume: resume._id });
    }
    
    // Delete resume
    await resume.deleteOne();
    
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all versions of a resume
// @route   GET /api/resumes/:id/versions
// @access  Private
exports.getResumeVersions = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Check if the resume belongs to the user
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this resume' });
    }
    
    const versions = await ResumeVersion.find({ resume: req.params.id }).sort({ versionNumber: -1 });
    
    res.status(200).json(versions);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create a new version of a resume
// @route   POST /api/resumes/:id/versions
// @access  Private
exports.createResumeVersion = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Check if the resume belongs to the user
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this resume' });
    }
    
    // Get the current resume data
    const resumeData = await Resume.findById(req.params.id);
    
    // Create new version
    const version = await ResumeVersion.create({
      resume: req.params.id,
      user: req.user.id,
      versionNumber: resume.currentVersion,
      name: req.body.name || `Version ${resume.currentVersion}`,
      description: req.body.description || `Created on ${new Date().toLocaleString()}`,
      data: resumeData
    });
    
    // Update resume versions array
    await Resume.findByIdAndUpdate(
      req.params.id,
      { $push: { versions: version._id } }
    );
    
    res.status(201).json(version);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Restore a version of a resume
// @route   POST /api/resumes/:id/versions/:versionId/restore
// @access  Private
exports.restoreResumeVersion = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Check if the resume belongs to the user
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this resume' });
    }
    
    // Get the version to restore
    const version = await ResumeVersion.findById(req.params.versionId);
    
    if (!version) {
      return res.status(404).json({ message: 'Version not found' });
    }
    
    // Check if the version belongs to the resume
    if (version.resume.toString() !== req.params.id) {
      return res.status(400).json({ message: 'Version does not belong to this resume' });
    }
    
    // Create a new version with the current state before restoring
    await ResumeVersion.create({
      resume: req.params.id,
      user: req.user.id,
      versionNumber: resume.currentVersion + 1,
      name: `Pre-restore Version ${resume.currentVersion + 1}`,
      description: `Created before restoring to version ${version.versionNumber}`,
      data: resume
    });
    
    // Update resume with version data
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      {
        ...version.data._doc,
        currentVersion: resume.currentVersion + 2
      },
      { new: true }
    );
    
    // Create a new version for the restored state
    await ResumeVersion.create({
      resume: req.params.id,
      user: req.user.id,
      versionNumber: resume.currentVersion + 2,
      name: `Restored Version ${resume.currentVersion + 2}`,
      description: `Restored from version ${version.versionNumber}`,
      data: updatedResume
    });
    
    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Generate PDF of a resume
// @route   GET /api/resumes/:id/pdf
// @access  Private
exports.generatePDF = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Check if the resume belongs to the user or is public
    if (resume.user.toString() !== req.user.id && !resume.isPublic) {
      return res.status(403).json({ message: 'Not authorized to access this resume' });
    }
    
    // In a real implementation, we would generate a PDF here
    // For now, we'll just return a success message
    res.status(200).json({ message: 'PDF generation would happen here' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Optimize resume with AI
// @route   POST /api/resumes/:id/optimize
// @access  Private
exports.optimizeWithAI = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Check if the resume belongs to the user
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this resume' });
    }
    
    const { jobDescription } = req.body;
    
    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }
    
    // Optimize resume with AI
    const optimizedData = await optimizeResume(resume, jobDescription);
    
    // Create a new version with the current state before optimizing
    await ResumeVersion.create({
      resume: req.params.id,
      user: req.user.id,
      versionNumber: resume.currentVersion + 1,
      name: `Pre-optimization Version ${resume.currentVersion + 1}`,
      description: `Created before AI optimization`,
      data: resume
    });
    
    // Update resume with optimized data
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      {
        'personalInfo.summary': optimizedData.personalInfo.summary,
        experience: optimizedData.experience,
        skills: optimizedData.skills,
        currentVersion: resume.currentVersion + 2
      },
      { new: true }
    );
    
    // Create a new version for the optimized state
    await ResumeVersion.create({
      resume: req.params.id,
      user: req.user.id,
      versionNumber: resume.currentVersion + 2,
      name: `AI Optimized Version ${resume.currentVersion + 2}`,
      description: `Optimized with AI for job description`,
      data: updatedResume
    });
    
    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Convert resume to portfolio
// @route   POST /api/resumes/:id/portfolio
// @access  Private
exports.convertToPortfolio = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('user', 'username');
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Check if the resume belongs to the user
    if (resume.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this resume' });
    }
    
    // Check if portfolio already exists
    let portfolio = await Portfolio.findOne({ resume: req.params.id });
    
    if (portfolio) {
      // Update existing portfolio
      portfolio = await Portfolio.findOneAndUpdate(
        { resume: req.params.id },
        {
          theme: req.body.theme || portfolio.theme,
          sections: req.body.sections || portfolio.sections,
          isPublished: true,
          lastPublished: Date.now()
        },
        { new: true }
      );
    } else {
      // Create new portfolio
      portfolio = await Portfolio.create({
        user: req.user.id,
        resume: req.params.id,
        theme: req.body.theme || 'professional',
        sections: req.body.sections || {
          about: { enabled: true, title: 'About Me' },
          experience: { enabled: true, title: 'Work Experience' },
          education: { enabled: true, title: 'Education' },
          skills: { enabled: true, title: 'Skills' },
          projects: { enabled: true, title: 'Projects' },
          certifications: { enabled: true, title: 'Certifications' },
          contact: { enabled: true, title: 'Contact Me', showEmail: true, contactForm: true }
        },
        isPublished: true
      });
      
      // Update resume to indicate it has a portfolio
      await Resume.findByIdAndUpdate(
        req.params.id,
        {
          hasPortfolio: true,
          portfolioUrl: `/portfolio/${resume.user.username}`
        }
      );
    }
    
    // Return portfolio with user and resume data
    const populatedPortfolio = await Portfolio.findById(portfolio._id)
      .populate('user', 'username name email profilePicture')
      .populate('resume');
    
    res.status(200).json(populatedPortfolio);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};