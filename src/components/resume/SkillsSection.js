import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const SkillsSection = ({ skills, onAddSkill, onUpdateSkill, onRemoveSkill }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 3
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'level' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing !== null) {
      // Update existing skill
      Object.keys(formData).forEach(key => {
        onUpdateSkill(isEditing, key, formData[key]);
      });
      setIsEditing(null);
    } else {
      // Add new skill
      onAddSkill(formData);
    }
    setIsAdding(false);
    setFormData({
      name: '',
      level: 3
    });
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setFormData(skills[index]);
    setIsAdding(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      
      {!isAdding ? (
        <div>
          {skills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{skill.name}</h3>
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
                        onClick={() => onRemoveSkill(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {skill.level && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                  )}
                  <div className="mt-1 text-xs text-gray-500 text-right">
                    {skill.level}/5
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No skills added yet.</p>
          )}
          
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="mt-4 flex items-center text-primary hover:text-blue-700"
          >
            <FaPlus className="mr-2" /> Add Skill
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border rounded-lg p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="JavaScript, Project Management, etc."
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level: {formData.level}/5
            </label>
            <input
              type="range"
              id="level"
              name="level"
              min="1"
              max="5"
              value={formData.level}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setIsEditing(null);
                setFormData({
                  name: '',
                  level: 3
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
              {isEditing !== null ? 'Update' : 'Add'} Skill
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SkillsSection;