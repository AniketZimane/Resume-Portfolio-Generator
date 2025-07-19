const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const resumeRoutes = require('./routes/resumes');
const portfolioRoutes = require('./routes/portfolios');
const aiController = require('./controllers/ai');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3005',
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-session-token']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/portfolios', portfolioRoutes);

// AI Optimization endpoint
app.post('/api/resumes/:id/optimize', aiController.optimizeResume);

// PDF Generation endpoint (public access)
app.get('/api/resumes/:id/pdf', async (req, res) => {
  try {
    const resumeId = req.params.id;
    
    // Handle custom ID format (resume-timestamp)
    let resume;
    if (resumeId.startsWith('resume-')) {
      // Use the mock resume for custom IDs
      resume = {
        _id: resumeId,
        name: 'Sample Resume',
        template: 'modern'
      };
    } else {
      // For MongoDB ObjectIds, try to fetch from database
      try {
        const Resume = require('./models/Resume');
        resume = await Resume.findById(resumeId);
        if (!resume) {
          return res.status(404).json({ message: 'Resume not found' });
        }
      } catch (err) {
        // If database fetch fails, use mock data
        resume = {
          _id: resumeId,
          name: 'Sample Resume',
          template: 'modern'
        };
      }
    }
    
    // Generate PDF using puppeteer
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Get the template
    const handlebars = require('handlebars');
    const templatePath = path.join(__dirname, 'templates', 'pdf-template.html');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    
    // Sample data for the resume
    const resumeData = {
      name: resume.name || 'Professional Resume',
      fullName: 'John Doe',
      jobTitle: 'Software Developer',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      location: 'New York, NY',
      summary: 'Experienced software developer with a passion for creating efficient, scalable applications.',
      experience: [
        {
          company: 'Tech Solutions Inc.',
          position: 'Senior Developer',
          startDate: 'Jan 2019',
          endDate: '',
          current: true,
          description: 'Leading development of web applications using React and Node.js.'
        },
        {
          company: 'Digital Innovations',
          position: 'Junior Developer',
          startDate: 'Mar 2017',
          endDate: 'Dec 2018',
          current: false,
          description: 'Developed and maintained web applications.'
        }
      ],
      education: [
        {
          institution: 'University of Technology',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          startDate: 'Sep 2013',
          endDate: 'May 2017',
          current: false
        }
      ],
      skills: [
        { name: 'JavaScript' },
        { name: 'React' },
        { name: 'Node.js' },
        { name: 'Python' },
        { name: 'MongoDB' },
        { name: 'AWS' }
      ]
    };
    
    // Render the template with the data
    const htmlContent = template(resumeData);
    
    await page.setContent(htmlContent);
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Generate PDF
    const pdfPath = path.join(uploadsDir, `resume-${resumeId}.pdf`);
    await page.pdf({ path: pdfPath, format: 'A4' });
    
    await browser.close();
    
    // Send the PDF file
    res.download(pdfPath);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating PDF' });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resume-portfolio')
  .then(() => {
    console.log('MongoDB Connected');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    
    // Start server even if MongoDB connection fails (for development)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`);
    });
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});