// src/components/ResumeBuilder/Canvas.tsx
import { Resume } from '../../services/resumeService';

interface CanvasProps {
	resume: Resume;
}

const Canvas = ({ resume }: CanvasProps) => {
	const { name, email, phone, summary } = resume.data;

	return (
		<div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[10mm] text-black" id="resume-canvas">
			{/* Resume Header */}
			<header className="border-b-2 border-gray-800 pb-4 mb-6">
				<h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">
					{name || 'Your Name'}
				</h1>
				<div className="mt-2 flex space-x-4 text-sm text-gray-600">
					{email && <span>{email}</span>}
					{phone && <span>• {phone}</span>}
				</div>
			</header>

			{/* Summary Section */}
			{summary && (
				<section className="mb-6">
					<h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 text-blue-800">
						Professional Summary
					</h2>
					<p className="text-gray-700 leading-relaxed">
						{summary}
					</p>
				</section>
			)}

			{/* Placeholder for Experience/Education */}
			<div className="mt-8 p-4 bg-gray-100 rounded text-center text-gray-500 text-sm border-dashed border-2 border-gray-300">
				Add Experience and Education sections in the Sidebar to see them here.
			</div>
		</div>
	);
};

export default Canvas;
