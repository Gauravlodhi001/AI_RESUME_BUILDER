// src/components/ResumeBuilder/Canvas.tsx
import { Resume } from '../../services/resumeService';
import ModernTemplate from './Templates/ModernTemplate';
import ProfessionalTemplate from './Templates/ProfessionalTemplate';
import MinimalistTemplate from './Templates/MinimalistTemplate';

interface CanvasProps {
	resume: Resume;
}

const Canvas = ({ resume }: CanvasProps) => {
	const templateId = resume.data.templateId || 'modern';

	const renderTemplate = () => {
		switch (templateId) {
			case 'professional':
				return <ProfessionalTemplate resume={resume} />;
			case 'minimalist':
				return <MinimalistTemplate resume={resume} />;
			case 'modern':
			default:
				return <ModernTemplate resume={resume} />;
		}
	};

	return (
		<div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl overflow-hidden" id="resume-canvas">
			{renderTemplate()}
		</div>
	);
};

export default Canvas;
