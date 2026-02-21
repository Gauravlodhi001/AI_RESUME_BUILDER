import { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import RightSidebar from './RightSidebar';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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


  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-canvas');
    if (!element) return;

    setIsDownloading(true);

    // Temporarily reset scaling for proper PDF generation
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;
    element.style.transform = 'none';

    // Slight delay to ensure DOM repaints before generating PDF
    await new Promise(resolve => setTimeout(resolve, 50));

    const opt = {
      margin: 0,
      filename: `${resume.data.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } finally {
      // Restore the scale
      element.style.transform = originalTransform;
      element.style.transformOrigin = originalTransformOrigin;
      setIsDownloading(false);
    }
  };

  // Scroll to active section when it changes
  useEffect(() => {
    if (activeSection) {
      const sectionElement = document.getElementById(activeSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection]);

  // Calculate scaling for the canvas
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const padding = 64; // 32px padding on each side (p-8)
      const availableWidth = containerWidth - padding;

      // A4 width is 210mm (~794px at 96dpi)
      const A4_PIXELS = 794;

      if (availableWidth < A4_PIXELS) {
        setScale(availableWidth / A4_PIXELS);
      } else {
        setScale(1);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

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
        />

      </div>

      {/* Center Column: Canvas */}
      <main className="flex-1 overflow-y-auto relative bg-[#334155]/50" ref={containerRef}>
        <div className="min-h-full py-8 flex justify-center w-full">
          <div style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            height: scale !== 1 ? `${297 * 3.7795275591 * scale}px` : 'auto', // reserve height for A4 (297mm)
            marginBottom: scale !== 1 ? `${297 * 3.7795275591 * (scale - 1)}px` : '0px'
          }}>
            <Canvas resume={resume} updateResume={updateResume} />
          </div>
        </div>
      </main>

      {/* Right Column: Tools & AI Agent */}
      <div className="w-[340px] flex-shrink-0 h-full">
        <RightSidebar
          resume={resume}
          updateResume={updateResume}
          handleDownloadPDF={handleDownloadPDF}
          isDownloading={isDownloading}
          updateTemplate={updateTemplate}
        />
      </div>
    </div>
  );
};

export default ResumeBuilder;
