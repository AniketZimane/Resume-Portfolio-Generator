import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const PortfolioView = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        
        // For development without backend
        if (true) { // Always use mock data for now
          // Mock portfolio data
          const mockPortfolio = {
            user: {
              _id: 'mock-user-id',
              name: username === 'aniketz2126280' ? 'Aniket Sharma' : 'John Doe',
              username: username || 'johndoe',
              email: username === 'aniketz2126280' ? 'aniket@example.com' : 'john.doe@example.com',
              profilePicture: ''
            },
            resume: {
              personalInfo: {
                fullName: username === 'aniketz2126280' ? 'Aniket Sharma' : 'John Doe',
                jobTitle: username === 'aniketz2126280' ? 'Frontend Developer' : 'Full Stack Developer',
                email: username === 'aniketz2126280' ? 'aniket@example.com' : 'john.doe@example.com',
                phone: '(123) 456-7890',
                location: username === 'aniketz2126280' ? 'Mumbai, India' : 'New York, NY',
                website: username === 'aniketz2126280' ? 'https://aniket.dev' : 'https://johndoe.dev',
                summary: username === 'aniketz2126280' ? 'Creative frontend developer with expertise in React and modern UI frameworks.' : 'Experienced software developer with a passion for creating efficient, scalable applications.'
              },
              education: username === 'aniketz2126280' ? [
                {
                  institution: 'Mumbai University',
                  degree: 'Bachelor of Engineering',
                  fieldOfStudy: 'Computer Science',
                  startDate: '2016-08-01',
                  endDate: '2020-05-30',
                  current: false,
                  description: 'Graduated with distinction. Specialized in web technologies.'
                }
              ] : [
                {
                  institution: 'University of Technology',
                  degree: 'Bachelor of Science',
                  fieldOfStudy: 'Computer Science',
                  startDate: '2015-09-01',
                  endDate: '2019-05-30',
                  current: false,
                  description: 'Graduated with honors. Specialized in software engineering.'
                }
              ],
              experience: username === 'aniketz2126280' ? [
                {
                  company: 'WebTech Solutions',
                  position: 'Frontend Developer',
                  location: 'Mumbai, India',
                  startDate: '2020-07-15',
                  endDate: '',
                  current: true,
                  description: 'Developing responsive web applications using React and modern frontend frameworks.',
                  highlights: [
                    'Reduced page load time by 60%',
                    'Implemented responsive design for mobile users',
                    'Created reusable component library'
                  ]
                },
                {
                  company: 'Digital Creations',
                  position: 'UI Developer',
                  location: 'Pune, India',
                  startDate: '2020-01-10',
                  endDate: '2020-07-01',
                  current: false,
                  description: 'Designed and developed user interfaces for web applications.',
                  highlights: [
                    'Created UI components using React',
                    'Implemented animations using CSS and GSAP',
                    'Collaborated with UX designers'
                  ]
                }
              ] : [
                {
                  company: 'Tech Solutions Inc.',
                  position: 'Senior Developer',
                  location: 'New York, NY',
                  startDate: '2019-06-15',
                  endDate: '',
                  current: true,
                  description: 'Leading development of web applications using React and Node.js.',
                  highlights: [
                    'Improved application performance by 40%',
                    'Implemented CI/CD pipeline',
                    'Mentored junior developers'
                  ]
                }
              ],
              skills: username === 'aniketz2126280' ? [
                { name: 'JavaScript', level: 5 },
                { name: 'React', level: 5 },
                { name: 'HTML/CSS', level: 5 },
                { name: 'Tailwind CSS', level: 4 },
                { name: 'TypeScript', level: 4 },
                { name: 'Redux', level: 4 },
                { name: 'Next.js', level: 3 },
                { name: 'UI/UX Design', level: 3 }
              ] : [
                { name: 'JavaScript', level: 5 },
                { name: 'React', level: 4 },
                { name: 'Node.js', level: 4 },
                { name: 'Python', level: 3 },
                { name: 'MongoDB', level: 4 },
                { name: 'AWS', level: 3 }
              ],
              projects: username === 'aniketz2126280' ? [
                {
                  title: 'Portfolio Website',
                  description: 'A responsive portfolio website showcasing my projects and skills.',
                  technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
                  link: 'https://github.com/aniket/portfolio',
                  startDate: '2021-03-10',
                  endDate: '2021-04-15',
                  current: false
                },
                {
                  title: 'Task Management App',
                  description: 'A drag-and-drop task management application with team collaboration features.',
                  technologies: ['React', 'Redux', 'Firebase', 'Styled Components'],
                  link: 'https://github.com/aniket/taskmanager',
                  startDate: '2020-11-01',
                  endDate: '2021-01-20',
                  current: false
                },
                {
                  title: 'Weather Dashboard',
                  description: 'A weather dashboard that displays current and forecasted weather data.',
                  technologies: ['React', 'Chart.js', 'Weather API'],
                  link: 'https://github.com/aniket/weather',
                  startDate: '2020-08-05',
                  endDate: '2020-09-10',
                  current: false
                }
              ] : [
                {
                  title: 'E-commerce Platform',
                  description: 'A full-stack e-commerce solution with payment processing and inventory management.',
                  technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                  link: 'https://github.com/johndoe/ecommerce',
                  startDate: '2020-01-15',
                  endDate: '2020-06-30',
                  current: false
                }
              ],
              certifications: username === 'aniketz2126280' ? [
                {
                  name: 'React Developer Certification',
                  issuer: 'Meta',
                  date: '2022-05-20',
                  link: 'https://www.coursera.org/professional-certificates/meta-front-end-developer'
                },
                {
                  name: 'UI/UX Design Fundamentals',
                  issuer: 'Google',
                  date: '2021-11-10',
                  link: 'https://www.coursera.org/professional-certificates/google-ux-design'
                },
                {
                  name: 'Advanced JavaScript',
                  issuer: 'Udemy',
                  date: '2021-02-15',
                  link: 'https://www.udemy.com/course/advanced-javascript-concepts/'
                }
              ] : [
                {
                  name: 'AWS Certified Developer',
                  issuer: 'Amazon Web Services',
                  date: '2021-03-15',
                  link: 'https://aws.amazon.com/certification/'
                }
              ],
              socialLinks: username === 'aniketz2126280' ? {
                github: 'https://github.com/aniket',
                linkedin: 'https://linkedin.com/in/aniket-sharma',
                twitter: 'https://twitter.com/aniket_dev'
              } : {
                github: 'https://github.com/johndoe',
                linkedin: 'https://linkedin.com/in/johndoe',
                twitter: 'https://twitter.com/johndoe'
              }
            },
            theme: 'professional',
            sections: {
              about: { enabled: true, title: 'About Me' },
              experience: { enabled: true, title: 'Work Experience' },
              education: { enabled: true, title: 'Education' },
              skills: { enabled: true, title: 'Skills' },
              projects: { enabled: true, title: 'Projects' },
              certifications: { enabled: true, title: 'Certifications' },
              contact: { enabled: true, title: 'Contact Me', showEmail: true, contactForm: true }
            }
          };
          
          setPortfolio(mockPortfolio);
        } else {
          // Real API call
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/portfolios/${username}`);
          setPortfolio(response.data);
        }
      } catch (err) {
        setError('Failed to load portfolio');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPortfolio();
    } else {
      setError('Username not provided');
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-extrabold text-red-500">Error</h1>
          <p className="mt-2 text-lg text-gray-600">
            {error || 'Portfolio not found'}
          </p>
          <div className="mt-6">
            <a href="/" className="btn-primary">
              Go back home
            </a>
          </div>
        </div>
      </div>
    );
  }

  const { resume, theme, sections, user } = portfolio;
  const { personalInfo, experience, education, skills, projects, certifications } = resume;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Hero Section */}
      <header className={`py-20 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-primary text-white'}`}>
        <div className="max-w-5xl mx-auto text-center">
          {user.profilePicture && (
            <img
              src={user.profilePicture}
              alt={personalInfo.fullName}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white"
            />
          )}
          <h1 className="text-4xl font-bold">{personalInfo.fullName}</h1>
          <p className="text-xl mt-2">{personalInfo.jobTitle}</p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {personalInfo.email && (
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                  {personalInfo.email}
                </a>
              </div>
            )}
            
            {personalInfo.phone && sections.contact?.showPhone && (
              <div className="flex items-center">
                <FaPhone className="mr-2" />
                <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                  {personalInfo.phone}
                </a>
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
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personalInfo.website.replace(/^https?:/, '')}
                </a>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            {resume.socialLinks?.github && (
              <a
                href={resume.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200"
              >
                <FaGithub size={24} />
              </a>
            )}
            
            {resume.socialLinks?.linkedin && (
              <a
                href={resume.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200"
              >
                <FaLinkedin size={24} />
              </a>
            )}
            
            {resume.socialLinks?.twitter && (
              <a
                href={resume.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200"
              >
                <FaTwitter size={24} />
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4">
        {/* About Section */}
        {sections.about?.enabled && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
              {sections.about.title || 'About Me'}
            </h2>
            <div className="prose max-w-none">
              <p>{sections.about.content || personalInfo.summary}</p>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {sections.experience?.enabled && experience && experience.length > 0 && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
              {sections.experience.title || 'Work Experience'}
            </h2>
            
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                      {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-lg text-primary">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  <p className="mt-2">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside mt-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {sections.education?.enabled && education && education.length > 0 && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
              {sections.education.title || 'Education'}
            </h2>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h3 className="text-xl font-semibold">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                      {edu.current ? ' Present' : new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-lg text-primary">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  {edu.description && <p className="mt-2">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {sections.skills?.enabled && skills && skills.length > 0 && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
              {sections.skills.title || 'Skills'}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} flex flex-col items-center`}
                >
                  <span className="font-medium mb-2">{skill.name}</span>
                  {skill.level && (
                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {sections.projects?.enabled && projects && projects.length > 0 && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
              {sections.projects.title || 'Projects'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
                >
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="mb-4">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className={`px-3 py-1 rounded-full text-sm ${
                              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-block"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {sections.certifications?.enabled && certifications && certifications.length > 0 && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
              {sections.certifications.title || 'Certifications'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
                >
                  <h3 className="text-xl font-semibold mb-1">{cert.name}</h3>
                  <p className="text-primary mb-2">{cert.issuer}</p>
                  
                  {cert.date && (
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {sections.contact?.enabled && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
              {sections.contact.title || 'Contact Me'}
            </h2>
            
            {sections.contact.contactForm && (
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="input-field"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="input-field"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="input-field"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="input-field"
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className={`py-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Built with ResumeVault
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioView;