import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const ProjectsSection = ({ projects, onAddProject, onUpdateProject, onRemoveProject }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    link: '',
    image: '',
    startDate: '',
    endDate: '',
    current: false
  });
  const [newTechnology, setNewTechnology] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()]
      });
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing !== null) {
      // Update existing project
      Object.keys(formData).forEach(key => {
        onUpdateProject(isEditing, key, formData[key]);
      });
      setIsEditing(null);
    } else {
      // Add new project
      onAddProject(formData);
    }
    setIsAdding(false);
    setFormData({
      title: '',
      description: '',
      technologies: [],
      link: '',
      image: '',
      startDate: '',
      endDate: '',
      current: false
    });
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setFormData(projects[index]);
    setIsAdding(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      
      {!isAdding ? (
        <div>
          {projects.length > 0 ? (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{project.title}</h3>
                      {(project.startDate || project.endDate) && (
                        <p className="text-gray-500 text-sm">
                          {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          {project.startDate && (project.endDate || project.current) && ' - '}
                          {project.current ? 'Present' : (project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
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
                        onClick={() => onRemoveProject(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {project.description && <p className="mt-2">{project.description}</p>}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium">Technologies:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.link && (
                    <div className="mt-2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Project
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No projects added yet.</p>
          )}
          
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="mt-4 flex items-center text-primary hover:text-blue-700"
          >
            <FaPlus className="mr-2" /> Add Project
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border rounded-lg p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="E-commerce Website"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="input-field"
              placeholder="Describe your project, its purpose, and your role..."
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              Project Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com/project"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            <div className="flex">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                className="input-field flex-grow"
                placeholder="React, Node.js, etc."
              />
              <button
                type="button"
                onClick={handleAddTechnology}
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
            
            {formData.technologies.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input-field"
                disabled={formData.current}
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="current"
                  name="current"
                  checked={formData.current}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                  This is an ongoing project
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setIsEditing(null);
                setFormData({
                  title: '',
                  description: '',
                  technologies: [],
                  link: '',
                  image: '',
                  startDate: '',
                  endDate: '',
                  current: false
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
              {isEditing !== null ? 'Update' : 'Add'} Project
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectsSection;