// src/components/ResumeBuilder/Sidebar.tsx
import { Resume } from '../../services/resumeService';

interface SidebarProps {
	resume: Resume;
	updateResume: (data: any) => void;
	sections: { id: string; name: string }[];
	activeSection: string;
	setActiveSection: (id: string) => void;
}

const Sidebar = ({ resume, updateResume, sections, activeSection, setActiveSection }: SidebarProps) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		updateResume({ [name]: value });
	};

	return (
		<aside className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
			{/* Section Navigation */}
			<div className="flex overflow-x-auto p-2 bg-gray-900 border-b border-gray-700">
				{sections.map((section) => (
					<button
						key={section.id}
						onClick={() => setActiveSection(section.id)}
						className={`px-4 py-2 text-sm whitespace-nowrap ${activeSection === section.id
							? 'text-blue-400 border-b-2 border-blue-400'
							: 'text-gray-400 hover:text-white'
							}`}
					>
						{section.name}
					</button>
				))}
			</div>

			{/* Active Form */}
			<div className="p-6 overflow-y-auto flex-1 text-gray-200">
				{activeSection === 'personal' && (
					<div className="space-y-4">
						<h3 className="text-xl font-semibold mb-4 text-white">Personal Details</h3>

						<div>
							<label className="block text-sm mb-1 text-gray-400">Full Name</label>
							<input
								type="text"
								name="name"
								value={resume.data.name || ''}
								onChange={handleInputChange}
								className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
								placeholder="John Doe"
							/>
						</div>

						<div>
							<label className="block text-sm mb-1 text-gray-400">Email</label>
							<input
								type="email"
								name="email"
								value={resume.data.email || ''}
								onChange={handleInputChange}
								className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
								placeholder="john@example.com"
							/>
						</div>

						<div>
							<label className="block text-sm mb-1 text-gray-400">Phone</label>
							<input
								type="tel"
								name="phone"
								value={resume.data.phone || ''}
								onChange={handleInputChange}
								className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
								placeholder="+1 234 567 890"
							/>
						</div>

						<div>
							<label className="block text-sm mb-1 text-gray-400">Professional Summary</label>
							<textarea
								name="summary"
								rows={4}
								value={resume.data.summary || ''}
								onChange={handleInputChange}
								className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
								placeholder="Experienced software engineer..."
							/>
						</div>
					</div>
				)}

				{activeSection === 'skills' && (
					<div className="space-y-4">
						<h3 className="text-xl font-semibold mb-4 text-white">Skills</h3>

						<div className="flex gap-2">
							<input
								type="text"
								placeholder="Add a new skill (e.g. React)"
								className="flex-1 bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										const input = e.currentTarget;
										const value = input.value.trim();
										if (value) {
											const currentSkills = resume.data.sections.skills || [];
											updateResume({
												sections: {
													...resume.data.sections,
													skills: [...currentSkills, value]
												}
											});
											input.value = '';
										}
									}
								}}
							/>
						</div>
						<p className="text-xs text-gray-500">Press Enter to add</p>

						<div className="flex flex-wrap gap-2 mt-4">
							{(resume.data.sections.skills || []).map((skill: string, index: number) => (
								<div key={index} className="bg-blue-900/50 border border-blue-700 text-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
									<span>{skill}</span>
									<button
										onClick={() => {
											const currentSkills = resume.data.sections.skills || [];
											const newSkills = currentSkills.filter((_: string, i: number) => i !== index);
											updateResume({
												sections: {
													...resume.data.sections,
													skills: newSkills
												}
											});
										}}
										className="text-blue-300 hover:text-white"
									>
										×
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Placeholder for other sections */}
				{activeSection !== 'personal' && activeSection !== 'skills' && (
					<div className="text-center text-gray-500 mt-10">
						<p>Form for <strong>{sections.find(s => s.id === activeSection)?.name}</strong> coming soon.</p>
					</div>
				)}
			</div>
		</aside>
	);
};

export default Sidebar;
