interface ToolbarProps {
  resume: any;
  updateResume: any;
  saveResume: () => void;
  updateTemplate: (templateId: string) => void;
}

const Toolbar = ({ saveResume, updateTemplate, resume }: ToolbarProps) => {
  const currentTemplate = resume?.data?.templateId || 'modern';

  return (
    <div className="w-20 bg-slate-800 border-l border-gray-700 flex flex-col items-center py-4 space-y-6">
      <button
        onClick={saveResume}
        className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 shadow-lg"
        title="Save Resume"
      >
        💾
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