import { useState } from 'react';
import { generateResumeContent } from '../../services/aiService';
import { Resume } from '../../services/resumeService';
import Button from '../ui/Button';

interface AIAssistantProps {
    resume: Resume;
    updateResume: (data: any) => void;
}

const AIAssistant = ({ resume, updateResume }: AIAssistantProps) => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
        { role: 'ai', content: 'Hi! I am your AI agent. I can help you build your resume. Ask me to "Suggest skills for a Java Dev" or "Write a summary".' }
    ]);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        const userMessage = prompt;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setPrompt('');
        setLoading(true);

        try {
            const generatedContent = await generateResumeContent(userMessage, resume.data);
            updateResume(generatedContent);

            setMessages(prev => [...prev, {
                role: 'ai',
                content: 'I have updated your resume based on your request! Check the changes in the center canvas.'
            }]);
        } catch (error: any) {
            console.error('AI Generation Error:', error);
            // Show the actual error message for debugging
            setMessages(prev => [...prev, {
                role: 'ai',
                content: `Error: ${error.message || 'Unknown error occurred'}. Please try again.`
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col h-full shadow-xl z-20">
            <div className="bg-purple-900/50 p-4 border-b border-purple-500/30">
                <h3 className="font-bold text-white flex items-center gap-2">
                    ✨ AI Agent
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`p-3 rounded-lg text-sm ${msg.role === 'ai' ? 'bg-gray-800 text-gray-200 mr-4' : 'bg-purple-600 text-white ml-4'}`}>
                        {msg.content}
                    </div>
                ))}
                {loading && <div className="text-gray-500 text-xs italic animate-pulse">Processing...</div>}
            </div>

            <div className="p-4 bg-gray-900 border-t border-gray-800">
                <textarea
                    className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white text-sm focus:outline-none focus:border-purple-500 resize-none h-24 mb-2"
                    placeholder="Tell me what to change..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleGenerate();
                        }
                    }}
                />
                <Button onClick={handleGenerate} disabled={loading || !prompt.trim()} className="w-full py-2 text-sm bg-purple-600 hover:bg-purple-700">
                    Send Command
                </Button>
            </div>
        </aside>
    );
};

export default AIAssistant;
