// src/components/ResumeBuilder/Canvas.tsx
import { Resume } from '../../services/resumeService';
import TemplateDani from './Templates/TemplateDani';

interface CanvasProps {
	resume: Resume;
	updateResume: (data: any) => void;
}

const Canvas = ({ resume, updateResume }: CanvasProps) => {
	const templateId = resume.data.templateId || 'dani';

	const renderTemplate = () => {
		switch (templateId) {
			// case 'professional':
			// 	return <ProfessionalTemplate resume={resume} />;
			// case 'minimalist':
			// 	return <MinimalistTemplate resume={resume} />;
			// case 'modern':
			// 	return <ModernTemplate resume={resume} />;
			case 'dani':
			default:
				return <TemplateDani resume={resume} updateResume={updateResume} />;
		}
	};

	return (
		<div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl overflow-hidden shrink-0" id="resume-canvas">
			{renderTemplate()}
		</div>
	);
};

export default Canvas;
