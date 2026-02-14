import { Resume } from '../../../services/resumeService';

interface TemplateProps {
    resume: Resume;
}

const MinimalistTemplate = ({ resume }: TemplateProps) => {
    const { name, email, phone, summary, sections } = resume.data;

    return (
        <div className="flex h-full bg-white text-gray-800">
            {/* Sidebar Area */}
            <div className="w-1/3 bg-gray-100 p-6 border-r border-gray-200">
                <h1 className="text-2xl font-bold mb-6 break-words">{name || 'Your Name'}</h1>

                <div className="mb-8 text-sm">
                    {email && <div className="mb-1">{email}</div>}
                    {phone && <div>{phone}</div>}
                </div>

                {sections.skills && sections.skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Skills</h2>
                        <ul className="text-sm space-y-1">
                            {sections.skills.map((skill: string, index: number) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            {/* Main Content Area */}
            <div className="w-2/3 p-8">
                {summary && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Profile</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
                    </section>
                )}

                {sections.experience && sections.experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
                        {sections.experience.map((exp: any, index: number) => (
                            <div key={exp.id || index} className="mb-6 relative pl-4 border-l-2 border-gray-200">
                                <h3 className="font-bold text-gray-800">{exp.role}</h3>
                                <div className="text-sm text-gray-500 mb-2">{exp.company} | {exp.date}</div>
                                <p className="text-sm text-gray-600">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {sections.education && sections.education.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
                        {sections.education.map((edu: any, index: number) => (
                            <div key={edu.id || index} className="mb-4">
                                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                                <div className="text-sm text-gray-500">{edu.school}</div>
                                <div className="text-xs text-gray-400">{edu.date}</div>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default MinimalistTemplate;
