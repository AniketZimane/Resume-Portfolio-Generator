import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { toast } from 'react-toastify';
import { FaSave, FaEye, FaArrowLeft } from 'react-icons/fa';

const PortfolioBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchResumeById, convertToPortfolio } = useResume();
  
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [portfolioSettings, setPortfolioSettings] = useState({
    theme: 'professional',
    sections: {
      about: { enabled: true, title: 'About Me' },
      experience: { enabled: true, title: 'Work Experience' },
      education: { enabled: true, title: 'Education' },
      skills: { enabled: true, title: 'Skills' },
      projects: { enabled: true, title: 'Projects' },
      certifications: { enabled: true, title: 'Certifications' },
      contact: { enabled: true, title: 'Contact Me', showEmail: true, contactForm: true }
    }
  });

  useEffect(() => {
    const loadResume = async () => {
      try {
        setLoading(true);
        const resumeData = await fetchResumeById(id);
        if (resumeData) {
          setResume(resumeData);
        }
      } catch (error) {
        toast.error('Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadResume();
    }
  }, [id, fetchResumeById]);

  const handleSectionToggle = (section) => {
    setPortfolioSettings({
      ...portfolioSettings,
      sections: {
        ...portfolioSettings.sections,
        [section]: {
          ...portfolioSettings.sections[section],
          enabled: !portfolioSettings.sections[section].enabled
        }
      }
    });
  };

  const handleSectionTitleChange = (section, title) => {
    setPortfolioSettings({
      ...portfolioSettings,
      sections: {
        ...portfolioSettings.sections,
        [section]: {
          ...portfolioSettings.sections[section],
          title
        }
      }
    });
  };

  const handleThemeChange = (theme) => {
    setPortfolioSettings({
      ...portfolioSettings,
      theme
    });
  };

  const handleContactOptionChange = (option, value) => {
    setPortfolioSettings({
      ...portfolioSettings,
      sections: {
        ...portfolioSettings.sections,
        contact: {
          ...portfolioSettings.sections.contact,
          [option]: value
        }
      }
    });
  };

  const handleSavePortfolio = async () => {
    try {
      setSaving(true);
      const portfolio = await convertToPortfolio(id, portfolioSettings);
      if (portfolio) {
        toast.success('Portfolio created successfully!');
        navigate(`/portfolio/${portfolio.user.username}`);
      }
    } catch (error) {
      toast.error('Failed to create portfolio');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // In a real implementation, this would show a preview
    toast.info('Preview functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Resume not found</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-outline flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Portfolio</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/resume/builder/${id}`)}
            className="btn-outline flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Resume
          </button>
          <button
            onClick={handlePreview}
            className="btn-outline flex items-center"
          >
            <FaEye className="mr-2" /> Preview
          </button>
          <button
            onClick={handleSavePortfolio}
            disabled={saving}
            className="btn-primary flex items-center"
          >
            <FaSave className="mr-2" />
            {saving ? 'Creating...' : 'Create Portfolio'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Settings */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden sticky top-6">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-800">Portfolio Settings</h2>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Choose Theme</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['professional', 'creative', 'minimal', 'dark', 'colorful'].map((theme) => (
                    <div
                      key={theme}
                      className={`border rounded-md p-3 cursor-pointer ${
                        portfolioSettings.theme === theme
                          ? 'border-primary ring-2 ring-primary ring-opacity-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleThemeChange(theme)}
                    >
                      <div
                        className={`h-8 w-full rounded-md mb-2 ${
                          theme === 'professional' ? 'bg-gray-800' :
                          theme === 'creative' ? 'bg-gradient-to-r from-purple-500 to-blue-500' :
                          theme === 'minimal' ? 'bg-gray-100 border border-gray-300' :
                          theme === 'dark' ? 'bg-gray-900' :
                          'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
                        }`}
                      ></div>
                      <div className="text-center text-sm capitalize">{theme}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Sections</h3>
                <div className="space-y-3">
                  {Object.keys(portfolioSettings.sections).map((section) => (
                    <div key={section} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <label htmlFor={`section-${section}`} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            id={`section-${section}`}
                            checked={portfolioSettings.sections[section].enabled}
                            onChange={() => handleSectionToggle(section)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <span className="ml-2 capitalize">{section}</span>
                        </label>
                        {portfolioSettings.sections[section].enabled && (
                          <input
                            type="text"
                            value={portfolioSettings.sections[section].title}
                            onChange={(e) => handleSectionTitleChange(section, e.target.value)}
                            className="ml-2 text-sm border-gray-300 rounded-md w-32"
                            placeholder="Section Title"
                          />
                        )}
                      </div>
                      
                      {/* Additional options for contact section */}
                      {section === 'contact' && portfolioSettings.sections.contact.enabled && (
                        <div className="ml-6 mt-2 space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="show-email"
                              checked={portfolioSettings.sections.contact.showEmail}
                              onChange={(e) => handleContactOptionChange('showEmail', e.target.checked)}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor="show-email" className="ml-2 text-sm">
                              Show Email
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="contact-form"
                              checked={portfolioSettings.sections.contact.contactForm}
                              onChange={(e) => handleContactOptionChange('contactForm', e.target.checked)}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor="contact-form" className="ml-2 text-sm">
                              Include Contact Form
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Preview</h2>
            <p className="text-gray-600 mb-4">
              Your portfolio will be created based on your resume information and the settings you choose.
              You can customize the appearance and sections displayed.
            </p>
            
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-2">Resume Information</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>Name:</strong> {resume.personalInfo.fullName}</li>
                <li><strong>Job Title:</strong> {resume.personalInfo.jobTitle}</li>
                <li><strong>Email:</strong> {resume.personalInfo.email}</li>
                {resume.personalInfo.phone && <li><strong>Phone:</strong> {resume.personalInfo.phone}</li>}
                {resume.personalInfo.location && <li><strong>Location:</strong> {resume.personalInfo.location}</li>}
                <li><strong>Sections:</strong> {Object.keys(portfolioSettings.sections)
                  .filter(section => portfolioSettings.sections[section].enabled)
                  .map(section => portfolioSettings.sections[section].title)
                  .join(', ')}
                </li>
              </ul>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Portfolio URL</h3>
              <div className="flex items-center">
                <span className="text-gray-500">Your portfolio will be available at:</span>
                <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">
                  {window.location.origin}/portfolio/{resume.user?.username || 'your-username'}
                </code>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleSavePortfolio}
                disabled={saving}
                className="btn-primary w-full"
              >
                {saving ? 'Creating Portfolio...' : 'Create My Portfolio'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;