import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

// Initial resume state
const initialResumeState = {
  name: 'My Resume',
  template: 'modern',
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  interests: [],
  references: [],
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    portfolio: '',
    blog: ''
  },
  customSections: []
};

// Mock data for development
const mockResumes = [
  {
    _id: 'resume-1',
    name: 'Software Developer Resume',
    template: 'modern',
    personalInfo: {
      fullName: 'John Doe',
      jobTitle: 'Full Stack Developer',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      location: 'New York, NY',
      website: 'https://johndoe.dev',
      summary: 'Experienced software developer with a passion for creating efficient, scalable applications.'
    },
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2015-09-01',
        endDate: '2019-05-30',
        current: false,
        description: 'Graduated with honors. Specialized in software engineering.'
      }
    ],
    experience: [
      {
        company: 'Tech Solutions Inc.',
        position: 'Senior Developer',
        location: 'New York, NY',
        startDate: '2019-06-15',
        endDate: '',
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
        location: 'Boston, MA',
        startDate: '2017-03-01',
        endDate: '2019-06-01',
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
        link: 'https://github.com/johndoe/ecommerce',
        startDate: '2020-01-15',
        endDate: '2020-06-30',
        current: false
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2021-03-15',
        link: 'https://aws.amazon.com/certification/'
      }
    ],
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe'
    },
    currentVersion: 1,
    createdAt: '2023-01-15T12:00:00Z',
    updatedAt: '2023-03-20T14:30:00Z'
  }
];

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [resumeVersions, setResumeVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize localStorage with mock data if it doesn't exist
  useEffect(() => {
    const savedResumes = localStorage.getItem('mockResumes');
    if (!savedResumes) {
      console.log('Initializing localStorage with mock data');
      localStorage.setItem('mockResumes', JSON.stringify(mockResumes));
    }
  }, []);

  // Fetch user's resumes when user is authenticated
  useEffect(() => {
    if (currentUser) {
      fetchResumes();
    } else {
      setResumes([]);
      setCurrentResume(null);
      setResumeVersions([]);
    }
  }, [currentUser]);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For development, use mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get resumes from localStorage or use default mock data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      
      setResumes(userResumes);
    } catch (err) {
      setError(err.message || 'Failed to fetch resumes');
      toast.error(err.message || 'Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  const fetchResumeById = async (resumeId) => {
    try {
      setLoading(true);
      setError(null);
      
      // For development, use mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get resumes from localStorage or use default mock data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      
      // Find the resume by ID
      const resume = userResumes.find(r => r._id === resumeId);
      
      if (!resume) {
        // If resume not found, create a new one with the given ID
        console.log('Resume not found, creating a new one with ID:', resumeId);
        const newResume = {
          ...initialResumeState,
          _id: resumeId,
          user: currentUser?._id || 'mock-user-id',
          currentVersion: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Add the new resume to localStorage
        const updatedResumes = [...userResumes, newResume];
        localStorage.setItem('mockResumes', JSON.stringify(updatedResumes));
        
        setCurrentResume(newResume);
        return newResume;
      }
      
      setCurrentResume(resume);
      return resume;
    } catch (err) {
      console.error('Error fetching resume:', err);
      setError(err.message || 'Failed to fetch resume');
      toast.error(err.message || 'Failed to fetch resume');
      
      // Return a default resume as fallback
      const fallbackResume = {
        ...initialResumeState,
        _id: resumeId,
        name: 'My Resume',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return fallbackResume;
    } finally {
      setLoading(false);
    }
  };

  const fetchResumeVersions = async (resumeId) => {
    try {
      setLoading(true);
      setError(null);
      
      // For development, use mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get the actual resume data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      const resume = userResumes.find(r => r._id === resumeId) || mockResumes[0];
      
      // Create mock versions for the resume
      const mockVersions = [
        {
          _id: `version-${resumeId}-1`,
          resumeId: resumeId,
          name: 'Version 1',
          description: 'Initial version',
          data: resume, // Use the actual resume data
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          createdBy: currentUser?._id || 'mock-user-id'
        },
        {
          _id: `version-${resumeId}-2`,
          resumeId: resumeId,
          name: 'Version 2',
          description: 'Updated summary and skills',
          data: resume, // Use the actual resume data
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          createdBy: currentUser?._id || 'mock-user-id'
        },
        {
          _id: `version-${resumeId}-3`,
          resumeId: resumeId,
          name: 'Version 3',
          description: 'Added new experience',
          data: resume, // Use the actual resume data
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          createdBy: currentUser?._id || 'mock-user-id'
        }
      ];
      
      setResumeVersions(mockVersions);
      return mockVersions;
    } catch (err) {
      setError(err.message || 'Failed to fetch resume versions');
      toast.error(err.message || 'Failed to fetch resume versions');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (resumeData) => {
    try {
      setLoading(true);
      setError(null);
      
      // For development, use mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new resume with a unique ID
      const newResume = {
        ...resumeData,
        _id: 'resume-' + Date.now(),
        user: currentUser?._id || 'mock-user-id',
        currentVersion: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Get existing resumes from localStorage or use default mock data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      
      // Add the new resume to the list
      const updatedResumes = [...userResumes, newResume];
      
      // Save to localStorage
      localStorage.setItem('mockResumes', JSON.stringify(updatedResumes));
      
      setResumes(updatedResumes);
      setCurrentResume(newResume);
      toast.success('Resume created successfully!');
      return newResume;
    } catch (err) {
      setError(err.message || 'Failed to create resume');
      toast.error(err.message || 'Failed to create resume');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (resumeId, resumeData) => {
    try {
      setLoading(true);
      setError(null);
      
      // For development, use mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing resumes from localStorage or use default mock data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      
      // Find the resume to update
      const resumeIndex = userResumes.findIndex(r => r._id === resumeId);
      
      if (resumeIndex === -1) {
        throw new Error('Resume not found');
      }
      
      // Update the resume
      const updatedResume = {
        ...userResumes[resumeIndex],
        ...resumeData,
        updatedAt: new Date().toISOString(),
        currentVersion: (userResumes[resumeIndex].currentVersion || 0) + 1
      };
      
      // Update the resumes list
      const updatedResumes = [...userResumes];
      updatedResumes[resumeIndex] = updatedResume;
      
      // Save to localStorage
      localStorage.setItem('mockResumes', JSON.stringify(updatedResumes));
      
      // Update resumes list
      setResumes(updatedResumes);
      
      // Update current resume if it's the one being edited
      if (currentResume && currentResume._id === resumeId) {
        setCurrentResume(updatedResume);
      }
      
      toast.success('Resume updated successfully!');
      return updatedResume;
    } catch (err) {
      setError(err.message || 'Failed to update resume');
      toast.error(err.message || 'Failed to update resume');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      setLoading(true);
      setError(null);
      
      // For development, use mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing resumes from localStorage or use default mock data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      
      // Filter out the resume to delete
      const updatedResumes = userResumes.filter(resume => resume._id !== resumeId);
      
      // Save to localStorage
      localStorage.setItem('mockResumes', JSON.stringify(updatedResumes));
      
      // Remove from resumes list
      setResumes(updatedResumes);
      
      // Clear current resume if it's the one being deleted
      if (currentResume && currentResume._id === resumeId) {
        setCurrentResume(null);
      }
      
      toast.success('Resume deleted successfully!');
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete resume');
      toast.error(err.message || 'Failed to delete resume');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createResumeVersion = async (resumeId, versionData) => {
    try {
      setLoading(true);
      setError(null);
      
      // For development, use mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing resumes from localStorage or use default mock data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      
      // Find the resume
      const resume = userResumes.find(r => r._id === resumeId);
      
      if (!resume) {
        throw new Error('Resume not found');
      }
      
      // Create a new version
      const newVersion = {
        _id: `version-${resumeId}-${Date.now()}`,
        resumeId: resumeId,
        name: versionData.name || `Version ${Date.now()}`,
        description: versionData.description || '',
        data: versionData.data || resume,
        createdAt: new Date().toISOString(),
        createdBy: currentUser?._id || 'mock-user-id'
      };
      
      // Get existing versions from localStorage or create new array
      const savedVersions = localStorage.getItem('mockResumeVersions');
      const existingVersions = savedVersions ? JSON.parse(savedVersions) : [];
      
      // Add the new version
      const updatedVersions = [...existingVersions, newVersion];
      
      // Save to localStorage
      localStorage.setItem('mockResumeVersions', JSON.stringify(updatedVersions));
      
      // Update versions list if we're currently viewing versions for this resume
      if (currentResume && currentResume._id === resumeId) {
        setResumeVersions([...resumeVersions, newVersion]);
      }
      
      toast.success('Resume version saved successfully!');
      return newVersion;
    } catch (err) {
      setError(err.message || 'Failed to save resume version');
      toast.error(err.message || 'Failed to save resume version');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const restoreResumeVersion = async (resumeId, versionId) => {
    try {
      setLoading(true);
      setError(null);
      
      // For development, use mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the version to restore
      const version = resumeVersions.find(v => v._id === versionId);
      
      if (!version) {
        throw new Error('Version not found');
      }
      
      // Get existing resumes from localStorage or use default mock data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      
      // Find the resume to update
      const resumeIndex = userResumes.findIndex(r => r._id === resumeId);
      
      if (resumeIndex === -1) {
        throw new Error('Resume not found');
      }
      
      // Update the resume with the version data
      const restoredResume = {
        ...userResumes[resumeIndex],
        ...version.data,
        _id: resumeId, // Keep the original ID
        updatedAt: new Date().toISOString(),
        currentVersion: (userResumes[resumeIndex].currentVersion || 0) + 1
      };
      
      // Update the resumes list
      const updatedResumes = [...userResumes];
      updatedResumes[resumeIndex] = restoredResume;
      
      // Save to localStorage
      localStorage.setItem('mockResumes', JSON.stringify(updatedResumes));
      
      // Update current resume with restored version
      setCurrentResume(restoredResume);
      
      // Update resumes list
      setResumes(updatedResumes);
      
      toast.success('Resume version restored successfully!');
      return restoredResume;
    } catch (err) {
      setError(err.message || 'Failed to restore resume version');
      toast.error(err.message || 'Failed to restore resume version');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const convertToPortfolio = async (resumeId, portfolioSettings = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // For development, use mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get existing resumes from localStorage or use default mock data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      
      // Find the resume
      const resume = userResumes.find(r => r._id === resumeId);
      
      if (!resume) {
        throw new Error('Resume not found');
      }
      
      // Create a mock portfolio
      const portfolio = {
        _id: 'portfolio-' + Date.now(),
        user: {
          _id: currentUser?._id || 'mock-user-id',
          name: currentUser?.name || 'Test User',
          email: currentUser?.email || 'test@example.com',
          username: currentUser?.username || 'testuser'
        },
        resume: resume,
        theme: portfolioSettings.theme || 'professional',
        sections: portfolioSettings.sections || {
          about: { enabled: true, title: 'About Me' },
          experience: { enabled: true, title: 'Work Experience' },
          education: { enabled: true, title: 'Education' },
          skills: { enabled: true, title: 'Skills' },
          projects: { enabled: true, title: 'Projects' },
          certifications: { enabled: true, title: 'Certifications' },
          contact: { enabled: true, title: 'Contact Me', showEmail: true, contactForm: true }
        },
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Update the resume to indicate it has a portfolio
      const updatedResume = {
        ...resume,
        hasPortfolio: true,
        portfolioUrl: `/portfolio/${currentUser?.username || 'testuser'}`
      };
      
      // Update the resumes list
      const updatedResumes = userResumes.map(r => 
        r._id === resumeId ? updatedResume : r
      );
      
      // Save to localStorage
      localStorage.setItem('mockResumes', JSON.stringify(updatedResumes));
      localStorage.setItem('mockPortfolio', JSON.stringify(portfolio));
      
      // Update resumes list
      setResumes(updatedResumes);
      
      // Update current resume if it's the one being converted
      if (currentResume && currentResume._id === resumeId) {
        setCurrentResume(updatedResume);
      }
      
      toast.success('Resume converted to portfolio successfully!');
      return portfolio;
    } catch (err) {
      setError(err.message || 'Failed to convert resume to portfolio');
      toast.error(err.message || 'Failed to convert resume to portfolio');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const optimizeWithAI = async (resumeId, jobDescription) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get existing resumes from localStorage or use default mock data
      const savedResumes = localStorage.getItem('mockResumes');
      const userResumes = savedResumes ? JSON.parse(savedResumes) : mockResumes;
      
      // Find the resume to optimize
      const resumeIndex = userResumes.findIndex(r => r._id === resumeId);
      
      if (resumeIndex === -1) {
        throw new Error('Resume not found');
      }
      
      const resume = userResumes[resumeIndex];
      
      try {
        // Call the server-side AI optimization endpoint
        const response = await fetch('http://localhost:5000/api/resumes/' + resumeId + '/optimize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ jobDescription, resumeData: resume })
        });
        
        if (!response.ok) {
          throw new Error('Failed to optimize resume with AI');
        }
        
        const result = await response.json();
        
        // If server-side optimization fails, use client-side fallback
        if (!result) {
          throw new Error('No optimization result returned');
        }
        
        // Create an optimized version of the resume
        const optimizedResume = {
          ...resume,
          personalInfo: {
            ...resume.personalInfo,
            summary: result.personalInfo?.summary || `${resume.personalInfo.summary} Optimized for the job description with relevant keywords and skills.`
          },
          skills: result.skills || [
            ...resume.skills,
            { name: 'Communication', level: 4 },
            { name: 'Problem Solving', level: 5 }
          ],
          updatedAt: new Date().toISOString(),
          currentVersion: (resume.currentVersion || 0) + 1
        };
        
        // Update the resumes list
        const updatedResumes = [...userResumes];
        updatedResumes[resumeIndex] = optimizedResume;
        
        // Save to localStorage
        localStorage.setItem('mockResumes', JSON.stringify(updatedResumes));
        
        // Update current resume with optimized content
        setCurrentResume(optimizedResume);
        
        // Update resumes list
        setResumes(updatedResumes);
        
        toast.success('Resume optimized with AI successfully!');
        return optimizedResume;
      } catch (aiError) {
        console.error('AI optimization error:', aiError);
        
        // Fallback to simple optimization
        const optimizedResume = {
          ...resume,
          personalInfo: {
            ...resume.personalInfo,
            summary: `${resume.personalInfo.summary} Optimized for the job description with relevant keywords and skills.`
          },
          skills: [
            ...resume.skills,
            { name: 'Communication', level: 4 },
            { name: 'Problem Solving', level: 5 }
          ],
          updatedAt: new Date().toISOString(),
          currentVersion: (resume.currentVersion || 0) + 1
        };
        
        // Update the resumes list
        const updatedResumes = [...userResumes];
        updatedResumes[resumeIndex] = optimizedResume;
        
        // Save to localStorage
        localStorage.setItem('mockResumes', JSON.stringify(updatedResumes));
        
        // Update current resume with optimized content
        setCurrentResume(optimizedResume);
        
        // Update resumes list
        setResumes(updatedResumes);
        
        toast.success('Resume optimized successfully (fallback mode)!');
        return optimizedResume;
      }
    } catch (err) {
      console.error('Resume optimization error:', err);
      setError(err.message || 'Failed to optimize resume with AI');
      toast.error(err.message || 'Failed to optimize resume with AI');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    resumes,
    currentResume,
    resumeVersions,
    loading,
    error,
    fetchResumes,
    fetchResumeById,
    fetchResumeVersions,
    createResume,
    updateResume,
    deleteResume,
    createResumeVersion,
    restoreResumeVersion,
    convertToPortfolio,
    optimizeWithAI,
    setCurrentResume
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};