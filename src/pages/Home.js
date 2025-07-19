import React from 'react';
import resumeImage from '../assets/resume_template.png'; // adjust the path as needed
import { Link } from 'react-router-dom';
import { FaFileAlt, FaGlobe, FaHistory, FaRobot } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Build Your Professional Identity
              </h1>
              <p className="mt-6 text-xl max-w-3xl">
                Create stunning resumes and portfolios with version control. Track changes, restore previous versions, and convert to a portfolio website with one click.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link to="/register" className="btn-secondary text-lg px-6 py-3">
                  Get Started
                </Link>
                <Link to="/templates" className="text-white font-semibold hover:underline">
                  View Templates <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <img className="mx-auto rounded-lg shadow-xl" src={resumeImage} alt="Resume Builder Preview" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">
              Everything You Need to Stand Out
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to create professional resumes and portfolios.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <FaFileAlt className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-dark">Customizable Templates</h3>
              <p className="mt-2 text-base text-gray-600">
                Choose from a variety of professional templates designed to impress employers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <FaHistory className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-dark">Version Control</h3>
              <p className="mt-2 text-base text-gray-600">
                Track changes and restore previous versions of your resume at any time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <FaGlobe className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-dark">Portfolio Website</h3>
              <p className="mt-2 text-base text-gray-600">
                Convert your resume into a professional portfolio website with one click.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <FaRobot className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-dark">AI Optimization</h3>
              <p className="mt-2 text-base text-gray-600">
                Use AI to optimize your resume for ATS systems and improve your chances of getting hired.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Building your professional presence has never been easier.
            </p>
          </div>

          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Step 1 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-dark">Create Your Resume</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Choose a template and fill in your information. Our intuitive editor makes it easy to create a professional resume.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-dark">Customize and Optimize</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Customize your resume for different job applications and use our AI tools to optimize for ATS systems.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-dark">Share and Download</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Download your resume as a PDF or convert it to a portfolio website with a unique URL to share with employers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Build Your Professional Identity?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of professionals who have boosted their careers with our platform.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/register" className="btn-secondary text-lg px-8 py-3">
                Get Started for Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;