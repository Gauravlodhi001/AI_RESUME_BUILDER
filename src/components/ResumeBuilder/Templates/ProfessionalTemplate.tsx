import { Resume } from '../../../services/resumeService';

interface TemplateProps {
    resume: Resume;
}

const ProfessionalTemplate = ({ resume }: TemplateProps) => {
    const { name, email, phone, summary, sections } = resume.data;

    return (
        <div className="p-8 bg-white h-full text-gray-900 font-serif">
            <header className="text-center border-b border-gray-400 pb-6 mb-8">
                <h1 className="text-3xl font-bold mb-2">{name || 'Your Name'}</h1>
                <div className="text-sm text-gray-600">
                    {email && <span className="mx-2">{email}</span>}
                    {phone && <span className="mx-2">{phone}</span>}
                </div>
            </header>

            {summary && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">
                        Profile
                    </h2>
                    <p className="text-sm leading-relaxed text-justify">{summary}</p>
                </section>
            )}

            {sections.experience && sections.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">
                        Professional Experience
                    </h2>
                    {sections.experience.map((exp: any, index: number) => (
                        <div key={exp.id || index} className="mb-4">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold">{exp.company}</h3>
                                <span className="text-sm italic">{exp.date}</span>
                            </div>
                            <div className="text-sm font-semibold mb-1">{exp.role}</div>
                            <p className="text-sm text-gray-800">{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {sections.education && sections.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">
                        Education
                    </h2>
                    {sections.education.map((edu: any, index: number) => (
                        <div key={edu.id || index} className="mb-2">
                            <div className="flex justify-between">
                                <span className="font-bold">{edu.school}</span>
                                <span className="text-sm">{edu.date}</span>
                            </div>
                            <div className="text-sm">{edu.degree}</div>
                        </div>
                    ))}
                </section>
            )}

            {sections.skills && sections.skills.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">
                        Skills
                    </h2>
                    <p className="text-sm">
                        {sections.skills.join(' • ')}
                    </p>
                </section>
            )}
        </div>
    );
};

export default ProfessionalTemplate;
