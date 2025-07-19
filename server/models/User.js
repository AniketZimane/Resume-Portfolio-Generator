const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ],
    lowercase: true
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  // Security fields
  loginAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  lockUntil: {
    type: Date,
    default: null,
    select: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verificationToken: String,
  // Active sessions for the user
  activeSessions: [{
    token: String,
    device: String,
    ip: String,
    lastActive: Date
  }],
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    website: String,
    blog: String
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

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if user account is currently locked
UserSchema.methods.isLocked = function() {
  // Check if lockUntil exists and is greater than current time
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Update last login time
UserSchema.methods.updateLastLogin = async function(ip, device) {
  this.lastLogin = Date.now();
  
  // Add to active sessions
  if (ip && device) {
    this.activeSessions.push({
      token: crypto.randomBytes(16).toString('hex'),
      ip,
      device,
      lastActive: Date.now()
    });
    
    // Keep only the last 5 sessions
    if (this.activeSessions.length > 5) {
      this.activeSessions = this.activeSessions.slice(-5);
    }
  }
  
  return this.save();
};

// Update timestamps before saving
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);