import { Resume } from '../../../services/resumeService';

interface TemplateProps {
    resume: Resume;
}

const ModernTemplate = ({ resume }: TemplateProps) => {
    const { name, email, phone, summary, sections } = resume.data;

    return (
        <div className="p-8 bg-white h-full text-gray-800 font-sans">
            <header className="border-b-2 border-blue-600 pb-4 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">
                    {name || 'Your Name'}
                </h1>
                <div className="mt-2 flex space-x-4 text-sm text-gray-600">
                    {email && <span>{email}</span>}
                    {phone && <span>• {phone}</span>}
                </div>
            </header>

            {summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 mb-2">Professional Summary</h2>
                    <p className="text-gray-700 leading-relaxed">{summary}</p>
                </section>
            )}

            {sections.experience && sections.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 mb-4">Experience</h2>
                    {sections.experience.map((exp: any, index: number) => (
                        <div key={exp.id || index} className="mb-4">
                            <h3 className="font-bold text-gray-900">{exp.role}</h3>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>{exp.company}</span>
                                <span>{exp.date}</span>
                            </div>
                            <p className="text-sm text-gray-700">{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {sections.education && sections.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 mb-4">Education</h2>
                    {sections.education.map((edu: any, index: number) => (
                        <div key={edu.id || index} className="mb-4">
                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>{edu.school}</span>
                                <span>{edu.date}</span>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {sections.skills && sections.skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase text-blue-800 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {sections.skills.map((skill: string, index: number) => (
                            <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ModernTemplate;
