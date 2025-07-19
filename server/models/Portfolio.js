const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  theme: {
    type: String,
    enum: ['professional', 'creative', 'minimal', 'dark', 'colorful'],
    default: 'professional'
  },
  sections: {
    about: {
      enabled: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: 'About Me'
      },
      content: String
    },
    experience: {
      enabled: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: 'Work Experience'
      }
    },
    education: {
      enabled: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: 'Education'
      }
    },
    skills: {
      enabled: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: 'Skills'
      }
    },
    projects: {
      enabled: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: 'Projects'
      }
    },
    certifications: {
      enabled: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: 'Certifications'
      }
    },
    contact: {
      enabled: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: 'Contact Me'
      },
      showEmail: {
        type: Boolean,
        default: true
      },
      showPhone: {
        type: Boolean,
        default: false
      },
      contactForm: {
        type: Boolean,
        default: true
      }
    }
  },
  customSections: [{
    title: String,
    content: String,
    order: Number
  }],
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  analytics: {
    googleAnalyticsId: String
  },
  social: {
    showIcons: {
      type: Boolean,
      default: true
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  lastPublished: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);