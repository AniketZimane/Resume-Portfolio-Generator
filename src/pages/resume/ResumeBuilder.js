import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { toast } from 'react-toastify';
import { FaSave, FaDownload, FaHistory, FaGlobe, FaRobot } from 'react-icons/fa';
import { downloadResumePDF } from '../../utils/pdfGenerator';

// Resume Sections
import PersonalInfoSection from '../../components/resume/PersonalInfoSection';
import ExperienceSection from '../../components/resume/ExperienceSection';
import EducationSection from '../../components/resume/EducationSection';
import SkillsSection from '../../components/resume/SkillsSection';
import ProjectsSection from '../../components/resume/ProjectsSection';
import CertificationsSection from '../../components/resume/CertificationsSection';
import ResumePreview from '../../components/resume/ResumePreview';
import TemplateSelector from '../../components/resume/TemplateSelector';
// import AIOptimizer from '../../components/resume/AIOptimizer';

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

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    createResume, 
    updateResume, 
    createResumeVersion, 
    convertToPortfolio, 
    optimizeWithAI,
    currentResume
    // setCurrentResume - unused
  } = useResume();
  
  const [resumeData, setResumeData] = useState(initialResumeState);
  const [activeSection, setActiveSection] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [showAIOptimizer, setShowAIOptimizer] = useState(false);
  const [error, setError] = useState(null);

  // Load resume data if editing an existing resume
  useEffect(() => {
    const loadResume = async () => {
      if (id) {
        console.log('Loading resume with ID:', id);
        setIsLoading(true);
        setError(null);
        try {
          // Create a new resume with this ID if it doesn't exist
          const newResume = {
            ...initialResumeState,
            _id: id,
            name: 'My Resume',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          // Save to localStorage directly
          const savedResumes = localStorage.getItem('mockResumes');
          const userResumes = savedResumes ? JSON.parse(savedResumes) : [];
          
          // Check if resume with this ID already exists
          const existingIndex = userResumes.findIndex(r => r._id === id);
          
          if (existingIndex >= 0) {
            // Use existing resume
            setResumeData(userResumes[existingIndex]);
          } else {
            // Add new resume
            userResumes.push(newResume);
            localStorage.setItem('mockResumes', JSON.stringify(userResumes));
            setResumeData(newResume);
          }
        } catch (error) {
          console.error('Error loading resume:', error);
          toast.error('Failed to load resume');
          setError('Failed to load resume. Please try again.');
          // Set default resume data on error
          setResumeData({
            ...initialResumeState,
            _id: id
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadResume();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle nested input changes (for social links, etc.)
  const handleNestedInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle array item changes (for education, experience, etc.)
  const handleArrayItemChange = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add new item to array sections
  const handleAddItem = (section, newItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  // Remove item from array sections
  const handleRemoveItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Handle template change
  const handleTemplateChange = (template) => {
    setResumeData(prev => ({
      ...prev,
      template
    }));
  };

  // Save resume
  const handleSaveResume = async () => {
    setIsSaving(true);
    try {
      if (id) {
        // Update existing resume
        await updateResume(id, resumeData);
        // Create a new version
        await createResumeVersion(id, {
          name: `Version ${currentResume?.currentVersion + 1 || 1}`,
          description: `Updated on ${new Date().toLocaleString()}`,
          data: resumeData
        });
        toast.success('Resume updated successfully');
      } else {
        // Create new resume
        const newResume = await createResume(resumeData);
        if (newResume) {
          navigate(`/resume/builder/${newResume._id}`);
          toast.success('Resume created successfully');
        }
      }
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  // Download resume as PDF
  // const resumeRef = useRef(null); // Unused ref
  
  const handleDownloadPDF = (resumeElement) => {
    try {
      // Try server-side PDF generation first
      if (id) {
        window.open(`http://localhost:5000/api/resumes/${id}/pdf`, '_blank');
        return;
      }
      
      // Fallback to client-side PDF generation
      const filename = `${resumeData.name || 'resume'}-${new Date().toISOString().split('T')[0]}`;
      
      // Use the provided element or find it in the DOM
      const element = resumeElement || document.querySelector('.resume-container');
      
      if (!element) {
        toast.error('Resume preview not available');
        return;
      }
      
      downloadResumePDF(element, filename, resumeData.template);
      toast.success('Generating PDF download...');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download resume as PDF');
    }
  };

  // Convert to portfolio
  const handleConvertToPortfolio = async () => {
    if (id) {
      try {
        setIsLoading(true);
        const portfolio = await convertToPortfolio(id);
        if (portfolio) {
          toast.success('Resume converted to portfolio successfully');
          navigate(`/portfolio/${portfolio.user.username}`);
        }
      } catch (error) {
        toast.error('Failed to convert resume to portfolio');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.info('Please save your resume first');
    }
  };

  // Optimize with AI
  const handleOptimizeWithAI = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    try {
      setIsLoading(true);
      const optimizedResume = await optimizeWithAI(id, jobDescription);
      if (optimizedResume) {
        setResumeData(optimizedResume);
        toast.success('Resume optimized successfully');
        setShowAIOptimizer(false);
      }
    } catch (error) {
      toast.error('Failed to optimize resume');
    } finally {
      setIsLoading(false);
    }
  };

  // View version history
  const handleViewHistory = () => {
    if (id) {
      navigate(`/resume/history/${id}`);
    } else {
      toast.info('Please save your resume first');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Resume</h2>
          <p className="mb-4">Let's create a new resume from scratch.</p>
          
          <div className="mb-4">
            <label htmlFor="resumeName" className="block text-sm font-medium text-gray-700 mb-1">
              Resume Name
            </label>
            <input
              type="text"
              id="resumeName"
              value={resumeData.name}
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
              className="input-field"
              placeholder="My Professional Resume"
            />
          </div>
          
          <button
            onClick={() => {
              setError(null);
              setActiveSection('personal');
            }}
            className="btn-primary"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? 'Edit Resume' : 'Create New Resume'}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-md ${
              previewMode ? 'bg-gray-200 text-gray-700' : 'bg-gray-700 text-white'
            }`}
          >
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
          <button
            onClick={handleSaveResume}
            disabled={isSaving}
            className="btn-primary flex items-center"
          >
            <FaSave className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Resume'}
          </button>
        </div>
      </div>

      {/* Resume Name Input */}
      <div className="mb-6">
        <label htmlFor="resumeName" className="block text-sm font-medium text-gray-700">
          Resume Name
        </label>
        <input
          type="text"
          id="resumeName"
          value={resumeData.name}
          onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
          className="input-field mt-1"
          placeholder="My Professional Resume"
        />
      </div>

      {previewMode ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Resume Preview</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleDownloadPDF}
                className="btn-outline flex items-center text-sm"
              >
                <FaDownload className="mr-1" /> Download PDF
              </button>
              <button
                onClick={handleConvertToPortfolio}
                className="btn-outline flex items-center text-sm"
              >
                <FaGlobe className="mr-1" /> Create Portfolio
              </button>
              <button
                onClick={() => setShowAIOptimizer(true)}
                className="btn-outline flex items-center text-sm"
              >
                <FaRobot className="mr-1" /> Optimize with AI
              </button>
              {id && (
                <button
                  onClick={handleViewHistory}
                  className="btn-outline flex items-center text-sm"
                >
                  <FaHistory className="mr-1" /> Version History
                </button>
              )}
            </div>
          </div>
          <ResumePreview resumeData={resumeData} onDownload={handleDownloadPDF} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden sticky top-6">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-semibold text-gray-800">Resume Sections</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveSection('template')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === 'template'
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Template
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('personal')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === 'personal'
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Personal Information
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('experience')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === 'experience'
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Experience
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('education')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === 'education'
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Education
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('skills')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === 'skills'
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Skills
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('projects')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === 'projects'
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Projects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('certifications')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === 'certifications'
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Certifications
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('social')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === 'social'
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Social Links
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="p-4 border-t">
                <button
                  onClick={() => setShowAIOptimizer(true)}
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  <FaRobot className="mr-2" /> Optimize with AI
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              {activeSection === 'template' && (
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onSelectTemplate={handleTemplateChange}
                />
              )}

              {activeSection === 'personal' && (
                <PersonalInfoSection
                  personalInfo={resumeData.personalInfo}
                  onChange={(field, value) => handleInputChange('personalInfo', field, value)}
                />
              )}

              {activeSection === 'experience' && (
                <ExperienceSection
                  experience={resumeData.experience}
                  onAddExperience={(exp) => handleAddItem('experience', exp)}
                  onUpdateExperience={(index, field, value) =>
                    handleArrayItemChange('experience', index, field, value)
                  }
                  onRemoveExperience={(index) => handleRemoveItem('experience', index)}
                />
              )}

              {activeSection === 'education' && (
                <EducationSection
                  education={resumeData.education}
                  onAddEducation={(edu) => handleAddItem('education', edu)}
                  onUpdateEducation={(index, field, value) =>
                    handleArrayItemChange('education', index, field, value)
                  }
                  onRemoveEducation={(index) => handleRemoveItem('education', index)}
                />
              )}

              {activeSection === 'skills' && (
                <SkillsSection
                  skills={resumeData.skills}
                  onAddSkill={(skill) => handleAddItem('skills', skill)}
                  onUpdateSkill={(index, field, value) =>
                    handleArrayItemChange('skills', index, field, value)
                  }
                  onRemoveSkill={(index) => handleRemoveItem('skills', index)}
                />
              )}

              {activeSection === 'projects' && (
                <ProjectsSection
                  projects={resumeData.projects}
                  onAddProject={(project) => handleAddItem('projects', project)}
                  onUpdateProject={(index, field, value) =>
                    handleArrayItemChange('projects', index, field, value)
                  }
                  onRemoveProject={(index) => handleRemoveItem('projects', index)}
                />
              )}

              {activeSection === 'certifications' && (
                <CertificationsSection
                  certifications={resumeData.certifications}
                  onAddCertification={(cert) => handleAddItem('certifications', cert)}
                  onUpdateCertification={(index, field, value) =>
                    handleArrayItemChange('certifications', index, field, value)
                  }
                  onRemoveCertification={(index) => handleRemoveItem('certifications', index)}
                />
              )}

              {activeSection === 'social' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">GitHub</label>
                      <input
                        type="text"
                        value={resumeData.socialLinks.github}
                        onChange={(e) =>
                          handleNestedInputChange('socialLinks', 'github', e.target.value)
                        }
                        className="input-field mt-1"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                      <input
                        type="text"
                        value={resumeData.socialLinks.linkedin}
                        onChange={(e) =>
                          handleNestedInputChange('socialLinks', 'linkedin', e.target.value)
                        }
                        className="input-field mt-1"
                        placeholder="https://linkedin.com/in/yourusername"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Twitter</label>
                      <input
                        type="text"
                        value={resumeData.socialLinks.twitter}
                        onChange={(e) =>
                          handleNestedInputChange('socialLinks', 'twitter', e.target.value)
                        }
                        className="input-field mt-1"
                        placeholder="https://twitter.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                      <input
                        type="text"
                        value={resumeData.socialLinks.portfolio}
                        onChange={(e) =>
                          handleNestedInputChange('socialLinks', 'portfolio', e.target.value)
                        }
                        className="input-field mt-1"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Blog</label>
                      <input
                        type="text"
                        value={resumeData.socialLinks.blog}
                        onChange={(e) =>
                          handleNestedInputChange('socialLinks', 'blog', e.target.value)
                        }
                        className="input-field mt-1"
                        placeholder="https://yourblog.com"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Optimizer Modal */}
      {showAIOptimizer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Optimize Resume with AI</h2>
            <p className="mb-4 text-gray-600">
              Paste the job description below and our AI will optimize your resume to match the requirements.
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="input-field h-64"
              placeholder="Paste job description here..."
            ></textarea>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAIOptimizer(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleOptimizeWithAI}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? 'Optimizing...' : 'Optimize Resume'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;