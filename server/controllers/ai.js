const axios = require('axios');

/**
 * Optimize a resume using Google's Gemini API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.optimizeResume = async (req, res) => {
  try {
    const { jobDescription, resumeData } = req.body;
    
    if (!jobDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Job description is required' 
      });
    }
    
    if (!resumeData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Resume data is required' 
      });
    }
    
    console.log('Optimizing resume with job description:', jobDescription.substring(0, 100) + '...');
    
    // Format the resume data for the AI prompt
    const resumeInfo = `
      Name: ${resumeData.personalInfo?.fullName || 'Not provided'}
      Job Title: ${resumeData.personalInfo?.jobTitle || 'Not provided'}
      Summary: ${resumeData.personalInfo?.summary || 'Not provided'}
      Skills: ${resumeData.skills?.map(s => s.name).join(', ') || 'None provided'}
      Experience: ${resumeData.experience?.map(e => 
        `${e.position} at ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate}): ${e.description}`
      ).join('\\n') || 'None provided'}
    `;
    
    // Create the prompt for Gemini
    const prompt = `
      You are a professional resume optimizer. I'm going to provide you with a job description and my current resume.
      Please help me optimize my resume to better match this job description.
      
      JOB DESCRIPTION:
      ${jobDescription}
      
      MY CURRENT RESUME:
      ${resumeInfo}
      
      Please provide:
      1. An improved professional summary that highlights my relevant skills and experience for this job
      2. A list of 5-8 skills that are most relevant to this job based on my experience and the job description
      3. Any suggestions for improving my experience descriptions to better match the job requirements
      
      Format your response as JSON with the following structure:
      {
        "personalInfo": {
          "summary": "improved summary here"
        },
        "skills": [
          {"name": "Skill 1", "level": 4},
          {"name": "Skill 2", "level": 5}
        ],
        "suggestions": "Your suggestions for improving experience descriptions"
      }
    `;
    
    // Check if we have a Gemini API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log('No Gemini API key found, using fallback optimization');
      return res.status(200).json({
        personalInfo: {
          summary: `${resumeData.personalInfo?.summary || ''} Optimized for the job description with relevant keywords and skills.`
        },
        skills: [
          ...(resumeData.skills || []),
          { name: 'Communication', level: 4 },
          { name: 'Problem Solving', level: 5 }
        ],
        suggestions: 'Consider adding more specific achievements and metrics to your experience descriptions.'
      });
    }
    
    // Call the Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }
    );
    
    // Extract the response text
    const responseText = response.data.candidates[0].content.parts[0].text;
    console.log('AI response received:', responseText.substring(0, 100) + '...');
    
    // Parse the JSON from the response
    let optimizationResult;
    try {
      // Find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                        responseText.match(/```\n([\s\S]*?)\n```/) || 
                        responseText.match(/{[\s\S]*}/);
      
      const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : responseText;
      optimizationResult = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback to simple optimization
      optimizationResult = {
        personalInfo: {
          summary: `${resumeData.personalInfo?.summary || ''} Optimized for the job description with relevant keywords and skills.`
        },
        skills: [
          ...(resumeData.skills || []),
          { name: 'Communication', level: 4 },
          { name: 'Problem Solving', level: 5 }
        ],
        suggestions: 'Consider adding more specific achievements and metrics to your experience descriptions.'
      };
    }
    
    res.status(200).json(optimizationResult);
  } catch (error) {
    console.error('AI optimization error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error optimizing resume with AI',
      error: error.message
    });
  }
};