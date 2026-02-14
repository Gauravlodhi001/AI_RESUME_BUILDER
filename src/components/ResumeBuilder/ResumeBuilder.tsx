import { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import AIAssistant from './AIAssistant';
import { useResumeData } from '../../hooks/useResumeData';

// @ts-ignore
import html2pdf from 'html2pdf.js';

interface ResumeBuilderProps {
  user: any;
  navigate: (page: string) => void;
}

const ResumeBuilder = ({ user, navigate }: ResumeBuilderProps) => {
  const { resume, updateResume, updateTemplate } = useResumeData(user?.uid || '');
  const [activeSection, setActiveSection] = useState('personal');
  const [isDownloading, setIsDownloading] = useState(false);

  const [sections, setSections] = useState([
    { id: 'personal', name: 'Personal Details' },
    { id: 'summary', name: 'Summary' },
    { id: 'experience', name: 'Work Experience' },
    { id: 'education', name: 'Education' },
    { id: 'skills', name: 'Skills' },
    { id: 'references', name: 'References' },
  ]);

  const updateSectionName = (id: string, newName: string) => {
    setSections(prev => prev.map(sec => sec.id === id ? { ...sec, name: newName } : sec));

    // Also update the resume data so it reflects on the canvas
    const currentTitles = resume.data.sectionTitles || {
      personal: 'Contact Me',
      summary: 'Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      references: 'References'
    };

    updateResume({
      sectionTitles: {
        ...currentTitles,
        [id]: newName
      }
    });
  };


  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-canvas');
    if (!element) return;

    setIsDownloading(true);
    const opt = {
      margin: 0,
      filename: `${resume.data.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsDownloading(false);
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-xl">Please sign in to view your resume.</div>
        <button onClick={() => navigate('landing')} className="ml-4 text-cyan-400 hover:underline">Go to Landing Page</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#1e293b] overflow-hidden">
      {/* Left Column: Navigation & Forms */}
      <div className="w-[340px] flex-shrink-0 h-full">
        <Sidebar
          resume={resume}
          updateResume={updateResume}
          sections={sections}
          updateSectionName={updateSectionName}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleDownloadPDF={handleDownloadPDF}
          isDownloading={isDownloading}
          updateTemplate={updateTemplate}
        />

      </div>

      {/* Center Column: Canvas */}
      <main className="flex-1 overflow-hidden relative flex flex-col items-center bg-[#334155]/50">
        <div className="w-full h-full overflow-auto p-8 flex justify-center custom-scrollbar">
          <Canvas resume={resume} updateResume={updateResume} />
        </div>
      </main>

      {/* Right Column: AI Agent */}
      <div className="w-[320px] flex-shrink-0 h-full border-l border-gray-700">
        <AIAssistant
          resume={resume}
          updateResume={updateResume}
        />
      </div>
    </div>
  );
};

export default ResumeBuilder;
