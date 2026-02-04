interface ToolbarProps {
  resume: any;
  updateResume: any;
  saveResume: () => void;
}
const Toolbar = ({ saveResume }: ToolbarProps) => (
  <div className="w-16 bg-slate-800 border-l border-gray-700 flex flex-col items-center py-4 space-y-4">
    <button onClick={saveResume} className="p-2 bg-blue-600 rounded text-white hover:bg-blue-500" title="Save">
      💾
    </button>
  </div>
);
export default Toolbar;