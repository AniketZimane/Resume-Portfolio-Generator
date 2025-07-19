import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const MinimalTemplate = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, projects, certifications, socialLinks } = resumeData;

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Header */}
      <header className="py-8 border-b border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-wide uppercase">{personalInfo.fullName}</h1>
          {personalInfo.jobTitle && <p className="text-lg text-gray-600 mt-1">{personalInfo.jobTitle}</p>}
          
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-gray-400" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <FaPhone className="mr-2 text-gray-400" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center">
                <FaGlobe className="mr-2 text-gray-400" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
          
          {(socialLinks?.github || socialLinks?.linkedin || socialLinks?.twitter) && (
            <div className="mt-4 flex justify-center space-x-4">
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-700"
                >
                  <FaGithub size={20} />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-700"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-700"
                >
                  <FaTwitter size={20} />
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <p className="text-center text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-light uppercase tracking-wider text-gray-500 mb-4 text-center">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h3 className="text-lg font-medium">{exp.position}</h3>
                  <span className="text-gray-500 text-sm">
                    {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                    {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                <p className="mt-2 text-gray-700">{exp.description}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-gray-700">
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
            <h2 className="text-lg font-light uppercase tracking-wider text-gray-500 mb-4 text-center">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h3 className="text-lg font-medium">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
                  <span className="text-gray-500 text-sm">
                    {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                    {edu.current ? ' Present' : new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-light uppercase tracking-wider text-gray-500 mb-4 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-light uppercase tracking-wider text-gray-500 mb-4 text-center">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  {(project.startDate || project.endDate) && (
                    <span className="text-gray-500 text-sm">
                      {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {project.startDate && project.endDate && ' - '}
                      {project.current ? 'Present' : (project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-gray-700">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-2">
                    <span className="text-gray-600">Technologies: </span>
                    <span className="text-gray-700">{project.technologies.join(', ')}</span>
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 mt-1 inline-block text-sm"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-light uppercase tracking-wider text-gray-500 mb-4 text-center">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">{cert.issuer}</p>
                  {cert.date && (
                    <p className="text-gray-500 text-sm">
                      {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  )}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 text-sm"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;