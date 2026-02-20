import { Resume } from '../../services/resumeService';
import AIAssistant from './AIAssistant';
import { Download } from 'lucide-react';

interface RightSidebarProps {
    resume: Resume;
    updateResume: (data: any) => void;
    handleDownloadPDF: () => void;
    isDownloading: boolean;
    updateTemplate: (id: string) => void;
}

const RightSidebar = ({ resume, updateResume, handleDownloadPDF, isDownloading, updateTemplate }: RightSidebarProps) => {
    const currentTemplate = resume.data.templateId || 'dani';

    return (
        <aside className="w-[340px] bg-[#0f172a] border-l border-gray-800 flex flex-col h-full z-20">
            {/* Top Section: Actions & Templates */}
            <div className="p-4 border-b border-gray-800 space-y-6">

                {/* Download Button */}
                <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isDownloading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Download size={18} className="group-hover:animate-bounce" />
                    )}
                    <span>DOWNLOAD PDF</span>
                </button>

                {/* Templates */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <span>Select Template</span>
                        <span className="text-[10px] bg-cyan-900/30 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-900/50">4 Available</span>
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                        {['modern', 'professional', 'minimalist', 'dani'].map((id) => (
                            <button
                                key={id}
                                onClick={() => updateTemplate(id)}
                                className={`aspect-square rounded-lg border-2 transition-all relative overflow-hidden group ${currentTemplate === id ? 'border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'border-gray-700 hover:border-gray-500'
                                    }`}
                                title={id.charAt(0).toUpperCase() + id.slice(1)}
                            >
                                <div className={`w-full h-full bg-gray-800 ${id === 'modern' ? 'bg-gradient-to-br from-gray-700 to-gray-900' :
                                    id === 'professional' ? 'bg-slate-700' :
                                        id === 'minimalist' ? 'bg-white' : 'bg-[#1e293b]'
                                    }`}>
                                    {/* Mini preview specific to template type */}
                                    <div className="opacity-30 p-1 space-y-1">
                                        <div className="h-1 w-1/2 bg-current rounded-full mb-2"></div>
                                        <div className="h-0.5 w-full bg-current rounded-full"></div>
                                        <div className="h-0.5 w-full bg-current rounded-full"></div>
                                    </div>
                                </div>
                                {currentTemplate === id && (
                                    <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_5px_cyan]"></div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Assistant - Takes up remaining height */}
            <div className="flex-1 overflow-hidden">
                <AIAssistant resume={resume} updateResume={updateResume} />
            </div>
        </aside>
    );
};

export default RightSidebar;
