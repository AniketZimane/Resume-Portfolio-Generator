import React, { useRef } from 'react';
import ModernTemplate from '../../templates/ModernTemplate';
import ClassicTemplate from '../../templates/ClassicTemplate';
import CreativeTemplate from '../../templates/CreativeTemplate';
import ProfessionalTemplate from '../../templates/ProfessionalTemplate';
import MinimalTemplate from '../../templates/MinimalTemplate';
import { downloadResumePDF } from '../../utils/pdfGenerator';

const ResumePreview = ({ resumeData, onDownload }) => {
  const resumeRef = useRef(null);

  // Render the appropriate template based on the selected template
  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate resumeData={resumeData} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />;
      default:
        return <ModernTemplate resumeData={resumeData} />;
    }
  };

  // Handle PDF download
  const handleDownload = () => {
    if (onDownload) {
      onDownload(resumeRef.current);
    } else {
      // Use the built-in PDF generator
      const filename = `${resumeData.name || 'resume'}-${new Date().toISOString().split('T')[0]}`;
      downloadResumePDF(resumeRef.current, filename, resumeData.template);
    }
  };

  return (
    <div className="bg-white p-6 shadow-inner">
      <div className="max-w-4xl mx-auto">
        <div ref={resumeRef} className="resume-container">
          {renderTemplate()}
        </div>
      </div>
      
      {/* Download button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleDownload}
          className="btn-primary flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;