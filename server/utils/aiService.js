const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API
// Use the API key from environment variables or fallback to the hardcoded key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyD-vO6ZBlXYll4kbEYMvHeKAOzyA5uu6-o');

// Function to optimize resume content with AI
const optimizeResume = async (resumeData, jobDescription) => {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Prepare the prompt
    const prompt = `
    I have a resume and I want to optimize it for ATS (Applicant Tracking Systems) for the following job description:
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    MY CURRENT RESUME:
    Name: ${resumeData.personalInfo.fullName}
    Job Title: ${resumeData.personalInfo.jobTitle}
    Summary: ${resumeData.personalInfo.summary}
    
    EXPERIENCE:
    ${resumeData.experience.map(exp => `
    - ${exp.position} at ${exp.company} (${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)})
      ${exp.description}
      ${exp.highlights ? exp.highlights.map(h => `• ${h}`).join('\\n') : ''}
    `).join('\\n')}
    
    EDUCATION:
    ${resumeData.education.map(edu => `
    - ${edu.degree} in ${edu.fieldOfStudy}, ${edu.institution} (${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)})
      ${edu.description || ''}
    `).join('\\n')}
    
    SKILLS:
    ${resumeData.skills.map(skill => skill.name).join(', ')}
    
    Please optimize my resume for this job description by:
    1. Improving my summary to match the job requirements
    2. Enhancing my experience descriptions to include relevant keywords
    3. Prioritizing skills that match the job description
    4. Suggesting any additional improvements
    
    Return the optimized content in JSON format with the following structure:
    {
      "personalInfo": {
        "summary": "optimized summary"
      },
      "experience": [
        {
          "position": "same as original",
          "company": "same as original",
          "description": "optimized description",
          "highlights": ["optimized highlight 1", "optimized highlight 2"]
        }
      ],
      "skills": [
        {"name": "skill1", "level": 5},
        {"name": "skill2", "level": 4}
      ],
      "recommendations": "Additional recommendations for improving the resume"
    }
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\\{[\\s\\S]*\\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('AI optimization error:', error);
    throw new Error('Failed to optimize resume with AI');
  }
};

// Helper function to format dates
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

module.exports = {
  optimizeResume
};