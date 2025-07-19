import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import { FaPlus, FaEdit, FaTrash, FaDownload, FaGlobe, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { resumes, fetchResumes, deleteResume, convertToPortfolio } = useResume();
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    const loadResumes = async () => {
      await fetchResumes();
      setIsLoading(false);
    };
    
    loadResumes();
  }, [fetchResumes]);

  const handleDeleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      await deleteResume(id);
    }
  };

  const handleConvertToPortfolio = async (id) => {
    const portfolio = await convertToPortfolio(id);
    if (portfolio) {
      setPortfolioUrl(`/portfolio/${currentUser.username}`);
    }
  };

  const handleDownloadPDF = (id) => {
    window.open(`${process.env.REACT_APP_API_URL}/resumes/${id}/pdf`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/resume/builder" className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Create New Resume
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Welcome, {currentUser.name}!</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your resumes and portfolios from this dashboard.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Resumes</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{resumes.length}</dd>
              </div>
            </div>
            <div className="bg-green-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Portfolio Website</dt>
                <dd className="mt-1">
                  {portfolioUrl ? (
                    <Link to={portfolioUrl} className="text-lg font-semibold text-primary hover:underline">
                      View Your Portfolio
                    </Link>
                  ) : (
                    <span className="text-lg font-semibold text-gray-400">Not Created Yet</span>
                  )}
                </dd>
              </div>
            </div>
            <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Account Type</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  Free Account
                  <Link to="/upgrade" className="ml-2 text-sm text-primary hover:underline">
                    Upgrade
                  </Link>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Your Resumes</h2>
          <div className="flex space-x-2">
            <select className="input-field py-1 px-2 text-sm">
              <option>Sort by: Newest</option>
              <option>Sort by: Oldest</option>
              <option>Sort by: Name A-Z</option>
              <option>Sort by: Name Z-A</option>
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-3 text-gray-500">Loading your resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-10 px-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No resumes</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new resume.</p>
            <div className="mt-6">
              <Link to="/resume/builder" className="btn-primary">
                <FaPlus className="mr-2" /> Create New Resume
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resumes.map((resume) => (
                  <tr key={resume._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{resume.name}</div>
                          <div className="text-sm text-gray-500">{resume.jobTitle || 'No job title'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(resume.updatedAt).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{new Date(resume.updatedAt).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{resume.template || 'Modern'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/resume/builder/${resume._id}`} className="text-primary hover:text-blue-700" title="Edit">
                          <FaEdit />
                        </Link>
                        <Link to={`/resume/history/${resume._id}`} className="text-gray-600 hover:text-gray-900" title="Version History">
                          <FaHistory />
                        </Link>
                        <button onClick={() => handleDownloadPDF(resume._id)} className="text-gray-600 hover:text-gray-900" title="Download PDF">
                          <FaDownload />
                        </button>
                        <button onClick={() => handleConvertToPortfolio(resume._id)} className="text-gray-600 hover:text-gray-900" title="Convert to Portfolio">
                          <FaGlobe />
                        </button>
                        <button onClick={() => handleDeleteResume(resume._id)} className="text-red-600 hover:text-red-900" title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;