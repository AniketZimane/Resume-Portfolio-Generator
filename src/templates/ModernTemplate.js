import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ModernTemplate = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, projects, certifications, socialLinks } = resumeData;

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="bg-blue-600 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
          <p className="text-xl mt-1 text-blue-100">{personalInfo.jobTitle}</p>
          
          <div className="mt-4 flex flex-wrap gap-4">
            {personalInfo.email && (
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <FaPhone className="mr-2" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center">
                <FaGlobe className="mr-2" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h3 className="text-xl font-semibold text-blue-600">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                    {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-lg text-gray-700 font-medium">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h3 className="text-xl font-semibold text-blue-600">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
                  <span className="text-gray-600 text-sm">
                    {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                    {edu.current ? ' Present' : new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-lg text-gray-700 font-medium">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.description && <p className="mt-2 text-gray-600">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      {skill.level && (
                        <span className="text-gray-500 text-sm">
                          {skill.level}/5
                        </span>
                      )}
                    </div>
                    {skill.level && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Certifications</h2>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold text-blue-600">{cert.name}</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-700">{cert.issuer}</span>
                    {cert.date && (
                      <span className="text-gray-600 text-sm">
                        {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-3">
                      <span className="font-medium text-gray-700">Technologies: </span>
                      <span className="text-gray-600">{project.technologies.join(', ')}</span>
                    </div>
                  )}
                  
                  {(project.startDate || project.endDate) && (
                    <p className="text-sm text-gray-500 mb-3">
                      {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {project.startDate && project.endDate && ' - '}
                      {project.current ? 'Present' : (project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                    </p>
                  )}
                  
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Social Links */}
        {(socialLinks?.github || socialLinks?.linkedin || socialLinks?.twitter) && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Connect</h2>
            <div className="flex space-x-4">
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <FaTwitter size={24} />
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;