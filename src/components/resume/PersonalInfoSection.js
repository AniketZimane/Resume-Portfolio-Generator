import React from 'react';

const PersonalInfoSection = ({ personalInfo, onChange }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className="input-field mt-1"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={personalInfo.jobTitle}
            onChange={(e) => onChange('jobTitle', e.target.value)}
            className="input-field mt-1"
            placeholder="Software Engineer"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={personalInfo.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="input-field mt-1"
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="input-field mt-1"
            placeholder="(123) 456-7890"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={personalInfo.location}
            onChange={(e) => onChange('location', e.target.value)}
            className="input-field mt-1"
            placeholder="New York, NY"
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            id="website"
            value={personalInfo.website}
            onChange={(e) => onChange('website', e.target.value)}
            className="input-field mt-1"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Professional Summary
        </label>
        <textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => onChange('summary', e.target.value)}
          rows={4}
          className="input-field mt-1"
          placeholder="A brief summary of your professional background and career goals..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Write a compelling summary that highlights your key strengths and career objectives.
          Keep it concise and focused on what makes you a strong candidate.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoSection;