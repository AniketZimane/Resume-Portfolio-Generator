const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for your resume'],
    trim: true
  },
  template: {
    type: String,
    enum: ['modern', 'classic', 'creative', 'professional', 'minimal'],
    default: 'modern'
  },
  personalInfo: {
    fullName: String,
    jobTitle: String,
    email: String,
    phone: String,
    location: String,
    website: String,
    summary: String
  },
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    location: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: String
  }],
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: String,
    highlights: [String]
  }],
  skills: [{
    name: String,
    level: Number
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String,
    image: String,
    startDate: Date,
    endDate: Date,
    current: Boolean
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    link: String
  }],
  languages: [{
    name: String,
    proficiency: String
  }],
  interests: [String],
  references: [{
    name: String,
    position: String,
    company: String,
    email: String,
    phone: String,
    reference: String
  }],
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    portfolio: String,
    blog: String
  },
  customSections: [{
    title: String,
    content: String
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  hasPortfolio: {
    type: Boolean,
    default: false
  },
  portfolioUrl: {
    type: String,
    default: ''
  },
  currentVersion: {
    type: Number,
    default: 1
  },
  versions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ResumeVersion'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);