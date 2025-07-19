const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Resume = require('./models/Resume');
const Portfolio = require('./models/Portfolio');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume-portfolio')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Resume.deleteMany({});
    await Portfolio.deleteMany({});

    console.log('Previous data cleared');

    // Create a user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user = await User.create({
      name: 'Aniket Z',
      email: 'aniketz@example.com',
      username: 'aniketz2126',
      password: hashedPassword,
      isEmailVerified: true
    });

    console.log('User created:', user.username);

    // Create a resume
    const resume = await Resume.create({
      user: user._id,
      name: 'My Professional Resume',
      template: 'modern',
      personalInfo: {
        fullName: 'Aniket Z',
        jobTitle: 'Full Stack Developer',
        email: 'aniketz@example.com',
        phone: '(123) 456-7890',
        location: 'Mumbai, India',
        website: 'https://aniket.dev',
        summary: 'Experienced software developer with a passion for creating efficient, scalable applications.'
      },
      education: [
        {
          institution: 'University of Technology',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          location: 'Mumbai',
          startDate: new Date('2015-09-01'),
          endDate: new Date('2019-05-30'),
          current: false,
          description: 'Graduated with honors. Specialized in software engineering.'
        }
      ],
      experience: [
        {
          company: 'Tech Solutions Inc.',
          position: 'Senior Developer',
          location: 'Mumbai, India',
          startDate: new Date('2019-06-15'),
          endDate: null,
          current: true,
          description: 'Leading development of web applications using React and Node.js.',
          highlights: [
            'Improved application performance by 40%',
            'Implemented CI/CD pipeline',
            'Mentored junior developers'
          ]
        },
        {
          company: 'Digital Innovations',
          position: 'Junior Developer',
          location: 'Pune, India',
          startDate: new Date('2017-03-01'),
          endDate: new Date('2019-06-01'),
          current: false,
          description: 'Developed and maintained web applications.',
          highlights: [
            'Worked on e-commerce platform',
            'Implemented payment gateway integration',
            'Collaborated with design team'
          ]
        }
      ],
      skills: [
        { name: 'JavaScript', level: 5 },
        { name: 'React', level: 4 },
        { name: 'Node.js', level: 4 },
        { name: 'Python', level: 3 },
        { name: 'MongoDB', level: 4 },
        { name: 'AWS', level: 3 }
      ],
      projects: [
        {
          title: 'E-commerce Platform',
          description: 'A full-stack e-commerce solution with payment processing and inventory management.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          link: 'https://github.com/aniketz/ecommerce',
          startDate: new Date('2020-01-15'),
          endDate: new Date('2020-06-30'),
          current: false
        }
      ],
      certifications: [
        {
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: new Date('2021-03-15'),
          link: 'https://aws.amazon.com/certification/'
        }
      ],
      socialLinks: {
        github: 'https://github.com/aniketz',
        linkedin: 'https://linkedin.com/in/aniketz',
        twitter: 'https://twitter.com/aniketz'
      }
    });

    console.log('Resume created:', resume.name);

    // Create a portfolio
    const portfolio = await Portfolio.create({
      user: user._id,
      resume: resume._id,
      theme: 'professional',
      sections: {
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

    console.log('Portfolio created');

    // Update resume with portfolio info
    await Resume.findByIdAndUpdate(resume._id, {
      hasPortfolio: true,
      portfolioUrl: `/portfolio/${user.username}`
    });

    console.log('Database seeded successfully!');
    console.log('\nYou can now login with:');
    console.log('Email: aniketz@example.com');
    console.log('Password: password123');
    console.log('\nPortfolio URL: /portfolio/aniketz2126');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();