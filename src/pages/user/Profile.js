import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaGlobe, FaGithub, FaLinkedin, FaTwitter, FaEdit, FaSave } from 'react-icons/fa';

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    bio: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      website: '',
      blog: ''
    }
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        username: currentUser.username || '',
        bio: currentUser.bio || '',
        socialLinks: {
          github: currentUser.socialLinks?.github || '',
          linkedin: currentUser.socialLinks?.linkedin || '',
          twitter: currentUser.socialLinks?.twitter || '',
          website: currentUser.socialLinks?.website || '',
          blog: currentUser.socialLinks?.blog || ''
        }
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await updateProfile(formData);
      if (success) {
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-outline flex items-center"
          >
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="btn-outline flex items-center"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {!isEditing ? (
          <div>
            <div className="px-4 py-5 sm:px-6 flex items-center">
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                {currentUser?.profilePicture ? (
                  <img
                    src={currentUser.profilePicture}
                    alt={currentUser.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUser className="h-10 w-10 text-gray-400" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold leading-6 text-gray-900">{currentUser?.name}</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">@{currentUser?.username}</p>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaEnvelope className="mr-2" /> Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentUser?.email}
                  </dd>
                </div>
                {currentUser?.bio && (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Bio</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUser.bio}
                    </dd>
                  </div>
                )}
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Social Links</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="space-y-2">
                      {currentUser?.socialLinks?.github && (
                        <li className="flex items-center">
                          <FaGithub className="mr-2" />
                          <a
                            href={currentUser.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            GitHub
                          </a>
                        </li>
                      )}
                      {currentUser?.socialLinks?.linkedin && (
                        <li className="flex items-center">
                          <FaLinkedin className="mr-2" />
                          <a
                            href={currentUser.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            LinkedIn
                          </a>
                        </li>
                      )}
                      {currentUser?.socialLinks?.twitter && (
                        <li className="flex items-center">
                          <FaTwitter className="mr-2" />
                          <a
                            href={currentUser.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Twitter
                          </a>
                        </li>
                      )}
                      {currentUser?.socialLinks?.website && (
                        <li className="flex items-center">
                          <FaGlobe className="mr-2" />
                          <a
                            href={currentUser.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Website
                          </a>
                        </li>
                      )}
                      {currentUser?.socialLinks?.blog && (
                        <li className="flex items-center">
                          <FaGlobe className="mr-2" />
                          <a
                            href={currentUser.socialLinks.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Blog
                          </a>
                        </li>
                      )}
                      {!currentUser?.socialLinks?.github && 
                       !currentUser?.socialLinks?.linkedin && 
                       !currentUser?.socialLinks?.twitter && 
                       !currentUser?.socialLinks?.website && 
                       !currentUser?.socialLinks?.blog && (
                        <li className="text-gray-500 italic">No social links added</li>
                      )}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field mt-1"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  This will be used for your portfolio URL: example.com/portfolio/{formData.username}
                </p>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="input-field mt-1"
                  placeholder="Tell us a little about yourself"
                ></textarea>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Social Links</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                      GitHub
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <FaGithub />
                      </span>
                      <input
                        type="url"
                        id="github"
                        name="github"
                        value={formData.socialLinks.github}
                        onChange={handleSocialLinkChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                      LinkedIn
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <FaLinkedin />
                      </span>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={handleSocialLinkChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                      Twitter
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <FaTwitter />
                      </span>
                      <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleSocialLinkChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Personal Website
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <FaGlobe />
                      </span>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.socialLinks.website}
                        onChange={handleSocialLinkChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="blog" className="block text-sm font-medium text-gray-700">
                      Blog
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <FaGlobe />
                      </span>
                      <input
                        type="url"
                        id="blog"
                        name="blog"
                        value={formData.socialLinks.blog}
                        onChange={handleSocialLinkChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="https://blog.example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;