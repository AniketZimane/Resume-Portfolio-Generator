import React, { useState } from 'react';
import { FaRobot, FaSpinner } from 'react-icons/fa';

const AIOptimizer = ({ onOptimize, isOptimizing }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [showTips, setShowTips] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      onOptimize(jobDescription);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <FaRobot className="text-primary text-2xl mr-2" />
        <h2 className="text-xl font-semibold">AI Resume Optimizer</h2>
      </div>
      
      <p className="text-gray-600 mb-4">
        Paste a job description below and our AI will optimize your resume to match the requirements,
        improving your chances of getting past Applicant Tracking Systems (ATS).
      </p>
      
      <button
        type="button"
        onClick={() => setShowTips(!showTips)}
        className="text-primary hover:text-blue-700 text-sm mb-4 underline"
      >
        {showTips ? 'Hide tips' : 'Show ATS optimization tips'}
      </button>
      
      {showTips && (
        <div className="bg-blue-50 p-4 rounded-md mb-4">
          <h3 className="font-medium text-blue-800 mb-2">ATS Optimization Tips:</h3>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>Use keywords from the job description in your resume</li>
            <li>Match your skills section to the required qualifications</li>
            <li>Use standard section headings (Experience, Education, Skills)</li>
            <li>Avoid using tables, images, or complex formatting</li>
            <li>Quantify your achievements with numbers when possible</li>
            <li>Use industry-standard job titles</li>
          </ul>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={10}
            className="input-field"
            placeholder="Paste the full job description here..."
            required
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isOptimizing || !jobDescription.trim()}
            className="btn-primary flex items-center"
          >
            {isOptimizing ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Optimizing...
              </>
            ) : (
              <>
                <FaRobot className="mr-2" /> Optimize Resume
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIOptimizer;