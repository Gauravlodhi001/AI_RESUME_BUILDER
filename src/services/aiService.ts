import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';

interface AiResponse {
  text: string;
  sources: { uri: string; title: string }[];
}

const functions = getFunctions(app);

// Callable function to interact with the AI model
const generateContent = httpsCallable<any, AiResponse>(functions, 'generateContent');

export const generateSummary = async (jobDescription: string): Promise<string> => {
  const prompt = `Act as a professional resume writer. Generate a concise, 3-4 sentence professional summary for a resume. The user's work experience is: "Developed web applications using React and Node.js. Led a team of 5 engineers. Managed project deadlines." The job description is: "${jobDescription}". Use keywords from the job description and make the summary impactful.`;

  try {
    const result = await generateContent({ prompt });
    return result.data.text;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary.');
  }
};

export const generateBulletPoints = async (jobDescription: string): Promise<string[]> => {
  const prompt = `Act as a professional resume writer. Rewrite the following job duties into powerful, metrics-driven bullet points for a resume. Focus on achievements and impact. The job duties are: "Developed and maintained web applications. Collaborated with a team on new features." The job description is: "${jobDescription}".`;

  try {
    const result = await generateContent({ prompt });
    // Assuming the AI returns a markdown list, parse it into an array
    return result.data.text.split('\n').map(line => line.replace(/^- /, '').trim()).filter(Boolean);
  } catch (error) {
    console.error('Error generating bullet points:', error);
    throw new Error('Failed to generate bullet points.');
  }
};
