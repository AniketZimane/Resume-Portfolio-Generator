import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Templates = () => {
  // Sample template data
  const resumeTemplates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional design with a modern touch.',
      image: '/images/templates/modern.svg',
      color: 'bg-blue-500'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional resume layout that works for any industry.',
      image: '/images/templates/classic.svg',
      color: 'bg-gray-700'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Stand out with this creative and unique design.',
      image: '/images/templates/creative.svg',
      color: 'bg-purple-500'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Elegant and sophisticated design for executives.',
      image: '/images/templates/professional.svg',
      color: 'bg-green-600'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and clean design focusing on content.',
      image: '/images/templates/minimal.svg',
      color: 'bg-gray-500'
    }
  ];

  const portfolioTemplates = [
    {
      id: 'portfolio-modern',
      name: 'Modern Portfolio',
      description: 'Sleek and interactive portfolio design.',
      image: '/images/templates/portfolio-modern.svg',
      color: 'bg-indigo-500'
    },
    {
      id: 'portfolio-classic',
      name: 'Classic Portfolio',
      description: 'Traditional portfolio layout with a professional look.',
      image: '/images/templates/portfolio-classic.svg',
      color: 'bg-red-600'
    },
    {
      id: 'portfolio-creative',
      name: 'Creative Portfolio',
      description: 'Showcase your work with this creative design.',
      image: '/images/templates/portfolio-creative.svg',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume & Portfolio Templates</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our professionally designed templates to create your perfect resume or portfolio.
        </p>
      </div>

      {/* Resume Templates */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Resume Templates</h2>
          <Link to="/resume/builder" className="btn-primary flex items-center">
            <FaPlus className="mr-2" /> Create New Resume
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`h-48 ${template.color} flex items-center justify-center`}>
                {template.image ? (
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Template+Preview';
                    }}
                  />
                ) : (
                  <div className="text-white text-2xl font-bold">{template.name}</div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <Link 
                  to={`/resume/builder?template=${template.id}`} 
                  className="btn-outline w-full text-center"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Templates */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Templates</h2>
          <Link to="/portfolio/builder" className="btn-primary flex items-center">
            <FaPlus className="mr-2" /> Create New Portfolio
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`h-48 ${template.color} flex items-center justify-center`}>
                {template.image ? (
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Template+Preview';
                    }}
                  />
                ) : (
                  <div className="text-white text-2xl font-bold">{template.name}</div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <Link 
                  to={`/portfolio/builder?template=${template.id}`} 
                  className="btn-outline w-full text-center"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Templates;