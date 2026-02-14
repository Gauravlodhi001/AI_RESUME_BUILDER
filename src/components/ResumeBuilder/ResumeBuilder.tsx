import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import ToolBar from './ToolBar';
import AIAssistant from './AIAssistant';
import { useResumeData } from '../../hooks/useResumeData';

interface ResumeBuilderProps {
  user: any;
  navigate: (page: string) => void;
}

const ResumeBuilder = ({ user, navigate }: ResumeBuilderProps) => {
  const { resume, updateResume, saveResume, updateTemplate } = useResumeData(user?.uid || '');
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', name: 'Personal Details' },
    { id: 'summary', name: 'Summary' },
    { id: 'experience', name: 'Work Experience' },
    { id: 'education', name: 'Education' },
    { id: 'skills', name: 'Skills' },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-xl">Please sign in to view your resume.</div>
        <button onClick={() => navigate('landing')}>Go to Landing Page</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900 relative">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Navigation & Forms */}
        <div className="flex flex-col h-full border-r border-gray-700">
          <Sidebar
            resume={resume}
            updateResume={updateResume}
            sections={sections}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <ToolBar
            resume={resume}
            updateResume={updateResume}
            saveResume={saveResume}
            updateTemplate={updateTemplate}
          />
        </div>

        {/* Center Column: Canvas */}
        <main className="flex-1 overflow-auto p-8 flex justify-center bg-gray-800 relative">
          <Canvas resume={resume} />
        </main>

        {/* Right Column: AI Agent */}
        <AIAssistant
          resume={resume}
          updateResume={updateResume}
        />
      </div>
    </div>
  );
};

export default ResumeBuilder;
