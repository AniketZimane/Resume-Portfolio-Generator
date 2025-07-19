import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ClassicTemplate = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, projects, certifications, socialLinks } = resumeData;

  return (
    <div className="font-serif text-gray-800 p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider">{personalInfo.fullName}</h1>
        {personalInfo.jobTitle && <p className="text-xl mt-1">{personalInfo.jobTitle}</p>}
        
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-2 text-gray-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <FaGlobe className="mr-2 text-gray-600" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      <hr className="border-gray-300 mb-6" />

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h3 className="text-lg font-semibold">{exp.position}</h3>
                <span className="text-gray-600 text-sm">
                  {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                  {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <p className="font-medium">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
              <p className="mt-1 text-gray-700">{exp.description}</p>
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
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h3 className="text-lg font-semibold">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
                <span className="text-gray-600 text-sm">
                  {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                  {edu.current ? ' Present' : new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <p className="font-medium">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
              {edu.description && <p className="mt-1 text-gray-700">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-sm text-gray-800">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <span className="text-gray-600 text-sm">
                    {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {project.startDate && project.endDate && ' - '}
                    {project.current ? 'Present' : (project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                  </span>
                )}
              </div>
              <p className="mt-1 text-gray-700">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-1">
                  <span className="font-medium">Technologies: </span>
                  <span className="text-gray-700">{project.technologies.join(', ')}</span>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-3">
              <h3 className="text-base font-semibold">{cert.name}</h3>
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

      {/* Social Links */}
      {(socialLinks?.github || socialLinks?.linkedin || socialLinks?.twitter) && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Connect</h2>
          <div className="flex space-x-4">
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900"
              >
                <FaGithub size={20} />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900"
              >
                <FaLinkedin size={20} />
              </a>
            )}
            {socialLinks?.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900"
              >
                <FaTwitter size={20} />
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;