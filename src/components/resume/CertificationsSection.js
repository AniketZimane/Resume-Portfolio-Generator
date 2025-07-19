import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const CertificationsSection = ({ certifications, onAddCertification, onUpdateCertification, onRemoveCertification }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    link: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing !== null) {
      // Update existing certification
      Object.keys(formData).forEach(key => {
        onUpdateCertification(isEditing, key, formData[key]);
      });
      setIsEditing(null);
    } else {
      // Add new certification
      onAddCertification(formData);
    }
    setIsAdding(false);
    setFormData({
      name: '',
      issuer: '',
      date: '',
      link: ''
    });
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setFormData(certifications[index]);
    setIsAdding(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Certifications</h2>
      
      {!isAdding ? (
        <div>
          {certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{cert.name}</h3>
                      <p className="text-gray-600">{cert.issuer}</p>
                      {cert.date && (
                        <p className="text-gray-500 text-sm">
                          {new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveCertification(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {cert.link && (
                    <div className="mt-2">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No certifications added yet.</p>
          )}
          
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="mt-4 flex items-center text-primary hover:text-blue-700"
          >
            <FaPlus className="mr-2" /> Add Certification
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border rounded-lg p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Certification Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="AWS Certified Solutions Architect"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">
              Issuing Organization *
            </label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              className="input-field"
              placeholder="Amazon Web Services"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              Certificate Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com/certificate"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setIsEditing(null);
                setFormData({
                  name: '',
                  issuer: '',
                  date: '',
                  link: ''
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEditing !== null ? 'Update' : 'Add'} Certification
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CertificationsSection;