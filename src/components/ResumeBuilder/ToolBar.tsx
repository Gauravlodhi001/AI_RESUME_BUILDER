interface ToolbarProps {
  resume: any;
  updateResume: any;
  saveResume: () => void;
  updateTemplate: (templateId: string) => void;
  handleDownloadPDF: () => void;
  isDownloading: boolean;
}

const Toolbar = ({ saveResume, updateTemplate, resume, handleDownloadPDF, isDownloading }: ToolbarProps) => {
  const currentTemplate = resume?.data?.templateId || 'modern';

  return (
    <div className="w-24 bg-slate-800 border-l border-gray-700 flex flex-col items-center py-4 space-y-4">
      <button
        onClick={handleDownloadPDF}
        disabled={isDownloading}
        className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white hover:from-green-400 hover:to-emerald-500 shadow-lg flex flex-col items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Download PDF"
      >
        <span className="text-2xl">{isDownloading ? '⏳' : '⬇️'}</span>
        <span className="text-[10px] font-bold leading-tight text-center">Download PDF</span>
      </button>

      <button
        onClick={saveResume}
        className="text-gray-400 hover:text-white text-xs flex items-center gap-1 hover:bg-slate-700 px-2 py-1 rounded transition-colors"
        title="Save to Cloud"
      >
        <span>☁️</span> Save
      </button>

      <div className="w-full border-t border-gray-700 my-2"></div>

      <div className="flex flex-col gap-3 w-full px-2">
        <span className="text-[10px] text-gray-400 text-center uppercase tracking-wider">Templates</span>

        <button
          onClick={() => updateTemplate('modern')}
          className={`w-full p-2 rounded text-xs transition-colors ${currentTemplate === 'modern' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          title="Modern Template"
        >
          Modern
        </button>

        <button
          onClick={() => updateTemplate('professional')}
          className={`w-full p-2 rounded text-xs transition-colors ${currentTemplate === 'professional' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          title="Professional Template"
        >
          Pro
        </button>

        <button
          onClick={() => updateTemplate('minimalist')}
          className={`w-full p-2 rounded text-xs transition-colors ${currentTemplate === 'minimalist' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          title="Minimalist Template"
        >
          Simple
        </button>
      </div>
    </div>
  );
};

export default Toolbar;