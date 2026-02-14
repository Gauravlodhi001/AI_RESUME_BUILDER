import { useState, useRef, useEffect } from 'react';
import { generateResumeContent } from '../../services/aiService';
import { Resume } from '../../services/resumeService';
import { Bot, Send, Sparkles, User } from 'lucide-react';

interface AIAssistantProps {
    resume: Resume;
    updateResume: (data: any) => void;
}

const AIAssistant = ({ resume, updateResume }: AIAssistantProps) => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
        { role: 'ai', content: 'Hello! I am your AI Assistant. I can help you build your resume. Ask me to "Suggest skills for a Java Dev" or "Write a summary".' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleGenerate = async (messageText: string = prompt) => {
        if (!messageText.trim()) return;

        const userMessage = messageText;
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
            setMessages(prev => [...prev, {
                role: 'ai',
                content: `Error: ${error.message || 'Unknown error occurred'}. Please try again.`
            }]);
        } finally {
            setLoading(false);
        }
    };

    const suggestions = [
        "Suggest Skills",
        "Optimize Description",
        "Fix Grammar",
        "Generate Summary"
    ];

    return (
        <aside className="w-80 bg-[#0f172a] border-l border-gray-800 flex flex-col h-full z-20">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <Bot size={20} />
                    <span>AI Assistant</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-purple-900/50 text-purple-400' : 'bg-gray-700 text-gray-300'
                            }`}>
                            {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${msg.role === 'ai'
                                ? 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                                : 'bg-purple-600 text-white rounded-tr-none'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-400">
                            <Bot size={16} />
                        </div>
                        <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none text-gray-400 text-xs border border-gray-700 flex items-center gap-2">
                            <Sparkles size={12} className="animate-spin" />
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => handleGenerate(s)}
                            disabled={loading}
                            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700 transition-colors disabled:opacity-50"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-900/50 border-t border-gray-800">
                <div className="relative">
                    <textarea
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-3 pr-10 py-3 text-white text-xs focus:outline-none focus:border-purple-500/50 resize-none h-12 custom-scrollbar"
                        placeholder="Message AI..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleGenerate();
                            }
                        }}
                    />
                    <button
                        onClick={() => handleGenerate()}
                        disabled={loading || !prompt.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white rounded-full transition-all disabled:opacity-50 disabled:bg-gray-700"
                    >
                        <Send size={14} />
                    </button>
                </div>
                <div className="text-[10px] text-center text-gray-600 mt-2">
                    AI can make mistakes. Review generated content.
                </div>
            </div>
        </aside>
    );
};

export default AIAssistant;
