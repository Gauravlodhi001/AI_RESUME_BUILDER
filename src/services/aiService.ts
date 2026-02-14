import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeData } from './resumeService';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini
let genAI: GoogleGenerativeAI | null = null;
if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(API_KEY);
}

// Helper to clean JSON string
const cleanJsonString = (str: string) => {
  return str.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const generateResumeContent = async (prompt: string, currentData: ResumeData): Promise<Partial<ResumeData>> => {
  console.log('Generating resume content with Gemini:', prompt);

  if (!genAI) {
    console.warn('Gemini API Key missing or invalid.');
    // Fallback to mock logic if no key
    return mockGenerate(prompt, currentData);
  }

  try {
    // Using 'gemini-3-flash-preview' as requested by the user
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const systematicPrompt = `
      You are an expert AI Resume Builder. 
      The user wants you to update their resume data based on this prompt: "${prompt}".
      
      Current Resume Data (JSON):
      ${JSON.stringify(currentData)}

      **INSTRUCTIONS:**
      1. Return ONLY valid JSON matching the 'ResumeData' structure.
      2. Do NOT return markdown formatting (no \`\`\`json).
      3. **PROFESSIONAL FORMATTING RULES:**
         - **Capitalization:** ALWAYS capitalize names, job titles, companies, and schools (e.g., "gaurav lodhi" -> "Gaurav Lodhi").
         - **Grammar:** Fix any typos or grammatical errors in the user's prompt or existing data.
         - **Tone:** Ensure all descriptions are professional, action-oriented, and concise.
      4. Update the fields relevant to the user's prompt.
      5. Keep existing data if it isn't relevant to the prompt.
      6. If the user asks for "Suggest Skills", add relevant skills to the 'skills' array.
      7. If the user asks for "Add Skill [SkillName]", add it to the 'skills' array.
      
      Output Structure:
      {
        "name": string,
        "email": string,
        "phone": string,
        "summary": string,
        "templateId": string,
        "sections": {
          "role": string,
          "skills": string[],
          "experience": [
            { "id": string, "company": string, "role": string, "date": string, "description": string }
          ],
          "education": [
            { "id": string, "school": string, "degree": string, "date": string, "description": string }
          ]
        }
      }
    `;

    const result = await model.generateContent(systematicPrompt);
    const responseText = result.response.text();
    const cleanedJson = cleanJsonString(responseText);

    const parsedData = JSON.parse(cleanedJson);
    return parsedData;

  } catch (error: any) {
    console.warn('Gemini API Error (Falling back to Mock):', error.message);

    // Fallback to mock if API fails (429, 404, etc.)
    const mockResult = await mockGenerate(prompt, currentData);

    // Add a small note to the summary indicating it's a mock result
    if (mockResult.summary && !mockResult.summary.includes('(Generated offline')) {
      mockResult.summary += " (Generated offline due to high AI traffic)";
    }

    return mockResult;
  }
};

// --- Mock Fallback (Keep for when API key is missing) ---
// --- Mock Fallback (Keep for when API key is missing) ---
const mockGenerate = async (prompt: string, currentData: ResumeData): Promise<Partial<ResumeData>> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const lowerPrompt = prompt.toLowerCase();

  // Skill Suggestions
  if (lowerPrompt.includes('suggest skills') || lowerPrompt.includes('skills for')) {
    const skills = ['Communication', 'Teamwork', 'Git'];
    if (lowerPrompt.includes('java')) skills.push('Java', 'Spring Boot', 'Microservices');
    if (lowerPrompt.includes('react') || lowerPrompt.includes('frontend')) skills.push('React', 'TypeScript', 'Tailwind');
    if (lowerPrompt.includes('python')) skills.push('Python', 'Django', 'FastAPI');

    const currentSkills = currentData.sections.skills || [];
    return {
      sections: {
        ...currentData.sections,
        skills: Array.from(new Set([...currentSkills, ...skills]))
      },
      summary: currentData.summary + " (Skills added offline)"
    };
  }

  // Add specific skill
  if (lowerPrompt.startsWith('add skill')) {
    const skill = prompt.replace(/add skill/i, '').trim();
    if (skill) {
      return {
        sections: {
          ...currentData.sections,
          skills: [...(currentData.sections.skills || []), skill]
        },
        summary: currentData.summary // Keep existing summary
      };
    }
  }

  if (lowerPrompt.includes('software engineer')) {
    return {
      summary: 'Passionate Software Engineer with expertise in React, TypeScript, and Node.js.',
      sections: {
        ...currentData.sections,
        role: 'Software Engineer',
        skills: ['React', 'TypeScript', 'Node.js'],
      }
    };
  }

  return { summary: `Offline Mode (Quota Exceeded): Processed "${prompt}". Try "Suggest skills for React" or "Add skill Docker"` };
};
