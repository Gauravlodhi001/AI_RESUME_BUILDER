import EditableElement from './EditableElement';
import { useRef } from 'react';
import { Phone, Mail, MapPin, Globe, Linkedin } from 'lucide-react';
import { Resume } from '../../../services/resumeService';

interface TemplateProps {
    resume: Resume;
    updateResume: (data: any) => void;
}

const TemplateDani = ({ resume, updateResume }: TemplateProps) => {
    const { name, email, phone, website, address, sections, profileImage, sectionTitles, linkedin } = resume.data;
    const role = sections.role || 'Marketing Manager';
    const skills = sections.skills || [];
    const education = sections.education || [];
    const experience = sections.experience || [];
    const references = sections.references || [];

    const getLinkedinUsername = (url: string) => {
        if (!url) return '';
        try {
            // Handle simple username entry
            if (!url.includes('linkedin.com')) return url;

            // Handle full URL
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            // usually /in/username or just /username
            return pathParts[pathParts.length - 1] || url;
        } catch (e) {
            return url;
        }
    };

    const titles = sectionTitles || {
        personal: 'Contact Me',
        summary: 'Summary',
        experience: 'Work Experience',
        education: 'Education',
        skills: 'Skills',
        references: 'References'
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log("File selected:", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                console.log("File read result:", result?.substring(0, 50) + "...");
                updateResume({ profileImage: result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex w-full h-full min-h-[297mm] text-gray-800 font-sans">
            {/* LEFT COLUMN (35%) */}
            <div id="personal" className="w-[35%] bg-[#f0f0f0] p-8 flex flex-col items-center pt-16">

                {/* Profile Image */}
                <div
                    className="w-48 h-48 rounded-full bg-gray-300 mb-12 overflow-hidden shadow-sm cursor-pointer relative group"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-300 group-hover:bg-gray-400 transition-colors">
                            <span className="text-4xl">📸</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Change Photo</span>
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                />

                {/* CONTACT ME */}
                <div className="w-full mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#4a4a4a] text-white px-8 py-2 rounded-full font-bold tracking-widest text-sm text-center w-full max-w-[200px]">
                            <EditableElement
                                tagName="span"
                                value={titles.personal}
                                onChange={(val) => updateResume({ sectionTitles: { ...titles, personal: val } })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 text-sm px-2">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 text-[#4a4a4a]">
                                <Phone size={16} />
                            </div>
                            <EditableElement
                                value={phone}
                                onChange={(val) => updateResume({ phone: val })}
                                placeholder="Phone"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 text-[#4a4a4a]">
                                <Mail size={16} />
                            </div>
                            <EditableElement
                                value={email}
                                onChange={(val) => updateResume({ email: val })}
                                placeholder="Email"
                                className="break-all"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 text-[#4a4a4a]">
                                <Globe size={16} />
                            </div>
                            <EditableElement
                                value={website || ''}
                                onChange={(val) => updateResume({ website: val })}
                                placeholder="Website"
                            />
                        </div>

                        {/* LinkedIn Integration */}
                        {linkedin && (
                            <div className="flex items-center gap-3">
                                <a
                                    href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-6 text-[#4a4a4a] hover:text-[#0077b5] transition-colors"
                                >
                                    <Linkedin size={16} />
                                </a>
                                <a
                                    href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-[#0077b5] transition-colors"
                                >
                                    {getLinkedinUsername(linkedin)}
                                </a>
                            </div>
                        )}

                        <div className="flex items-start gap-3">
                            <div className="flex items-start justify-center w-6 text-[#4a4a4a] mt-1">
                                <MapPin size={16} />
                            </div>
                            <EditableElement
                                value={address || ''}
                                onChange={(val) => updateResume({ address: val })}
                                placeholder="Address"
                            />
                        </div>
                    </div>
                </div>

                {/* EDUCATION */}
                <div id="education" className="w-full mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#4a4a4a] text-white px-8 py-2 rounded-full font-bold tracking-widest text-sm text-center w-full max-w-[200px]">
                            <EditableElement
                                tagName="span"
                                value={titles.education}
                                onChange={(val) => updateResume({ sectionTitles: { ...titles, education: val } })}
                            />
                        </div>
                    </div>

                    <div className="space-y-6 px-2">
                        {education.map((edu: any, index: number) => (
                            <div key={index}>
                                <EditableElement
                                    tagName="h4"
                                    className="font-bold text-gray-800 text-base"
                                    value={edu.degree}
                                    onChange={(val) => {
                                        const newEdu = [...education];
                                        newEdu[index] = { ...newEdu[index], degree: val };
                                        updateResume({ sections: { ...sections, education: newEdu } });
                                    }}
                                />
                                <EditableElement
                                    className="text-sm font-semibold text-gray-700"
                                    value={edu.school}
                                    onChange={(val) => {
                                        const newEdu = [...education];
                                        newEdu[index] = { ...newEdu[index], school: val };
                                        updateResume({ sections: { ...sections, education: newEdu } });
                                    }}
                                />
                                <EditableElement
                                    className="text-sm text-gray-500"
                                    value={edu.date}
                                    onChange={(val) => {
                                        const newEdu = [...education];
                                        newEdu[index] = { ...newEdu[index], date: val };
                                        updateResume({ sections: { ...sections, education: newEdu } });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* SKILLS */}
                <div id="skills" className="w-full">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#4a4a4a] text-white px-8 py-2 rounded-full font-bold tracking-widest text-sm text-center w-full max-w-[200px]">
                            <EditableElement
                                tagName="span"
                                value={titles.skills}
                                onChange={(val) => updateResume({ sectionTitles: { ...titles, skills: val } })}
                            />
                        </div>
                    </div>

                    <ul className="list-disc list-inside space-y-3 px-4 text-sm text-gray-800 font-medium">
                        {skills.map((skill: string, index: number) => (
                            <li key={index}>
                                <EditableElement
                                    tagName="span"
                                    value={skill}
                                    onChange={(val) => {
                                        const newSkills = [...skills];
                                        newSkills[index] = val;
                                        updateResume({ sections: { ...sections, skills: newSkills } });
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* RIGHT COLUMN (65%) */}
            <div className="w-[65%] bg-white p-12 pt-24 pr-16">

                {/* HEADER */}
                <div className="mb-16">
                    <EditableElement
                        tagName="h1"
                        className="text-6xl font-bold text-[#333] mb-2 leading-tight"
                        value={name}
                        onChange={(val) => updateResume({ name: val })}
                        placeholder="Your Name"
                    />
                    <EditableElement
                        tagName="h2"
                        className="text-2xl text-gray-500 tracking-widest uppercase mt-4"
                        value={role}
                        onChange={(val) => updateResume({ sections: { ...sections, role: val } })}
                        placeholder="Your Role"
                    />
                </div>

                {/* WORK EXPERIENCE */}
                <div id="summary" className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <EditableElement
                            tagName="h3"
                            className="text-2xl font-bold text-[#333] uppercase"
                            value={titles.summary}
                            onChange={(val) => updateResume({ sectionTitles: { ...titles, summary: val } })}
                        />
                        <div className="h-[2px] bg-gray-400 flex-1"></div>
                    </div>
                    <EditableElement
                        tagName="p"
                        className="text-sm text-gray-700 leading-relaxed text-justify"
                        value={resume.data.summary}
                        multiline
                        onChange={(val) => updateResume({ summary: val })}
                        placeholder="Professional summary goes here..."
                    />
                </div>

                {/* WORK EXPERIENCE */}
                <div id="experience" className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <EditableElement
                            tagName="h3"
                            className="text-2xl font-bold text-[#333] uppercase"
                            value={titles.experience}
                            onChange={(val) => updateResume({ sectionTitles: { ...titles, experience: val } })}
                        />
                        <div className="h-[2px] bg-gray-400 flex-1"></div>
                    </div>

                    <div className="space-y-8">
                        {experience.map((exp: any, index: number) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <EditableElement
                                        tagName="h4"
                                        className="font-bold text-lg text-gray-800"
                                        value={exp.role}
                                        onChange={(val) => {
                                            const newExp = [...experience];
                                            newExp[index] = { ...newExp[index], role: val };
                                            updateResume({ sections: { ...sections, experience: newExp } });
                                        }}
                                    />
                                    <EditableElement
                                        tagName="span"
                                        className="text-sm text-gray-600 font-medium"
                                        value={exp.date}
                                        onChange={(val) => {
                                            const newExp = [...experience];
                                            newExp[index] = { ...newExp[index], date: val };
                                            updateResume({ sections: { ...sections, experience: newExp } });
                                        }}
                                    />
                                </div>
                                <EditableElement
                                    className="text-sm font-bold text-gray-700 mb-2"
                                    value={exp.company}
                                    onChange={(val) => {
                                        const newExp = [...experience];
                                        newExp[index] = { ...newExp[index], company: val };
                                        updateResume({ sections: { ...sections, experience: newExp } });
                                    }}
                                />
                                <EditableElement
                                    tagName="p"
                                    className="text-sm text-gray-500 leading-relaxed text-justify"
                                    value={exp.description}
                                    multiline
                                    onChange={(val) => {
                                        const newExp = [...experience];
                                        newExp[index] = { ...newExp[index], description: val };
                                        updateResume({ sections: { ...sections, experience: newExp } });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* REFERENCES */}
                <div id="references">
                    <div className="flex items-center gap-4 mb-8">
                        <EditableElement
                            tagName="h3"
                            className="text-2xl font-bold text-[#333] uppercase"
                            value={titles.references}
                            onChange={(val) => updateResume({ sectionTitles: { ...titles, references: val } })}
                        />
                        <div className="h-[2px] bg-gray-400 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {references.map((ref: any, index: number) => (
                            <div key={index}>
                                <EditableElement
                                    tagName="h4"
                                    className="font-bold text-lg text-gray-800 mb-1"
                                    value={ref.name}
                                    onChange={(val) => {
                                        const newRefs = [...references];
                                        newRefs[index] = { ...newRefs[index], name: val };
                                        updateResume({ sections: { ...sections, references: newRefs } });
                                    }}
                                />
                                <EditableElement
                                    className="text-sm text-gray-600 font-bold"
                                    value={ref.company}
                                    onChange={(val) => {
                                        const newRefs = [...references];
                                        newRefs[index] = { ...newRefs[index], company: val };
                                        updateResume({ sections: { ...sections, references: newRefs } });
                                    }}
                                />
                                <div className="mt-3 text-sm text-gray-500">
                                    <div className="flex gap-1">
                                        <span className="font-bold text-gray-700">Phone:</span>
                                        <EditableElement
                                            tagName="span"
                                            value={ref.phone}
                                            onChange={(val) => {
                                                const newRefs = [...references];
                                                newRefs[index] = { ...newRefs[index], phone: val };
                                                updateResume({ sections: { ...sections, references: newRefs } });
                                            }}
                                        />
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="font-bold text-gray-700">Email:</span>
                                        <EditableElement
                                            tagName="span"
                                            value={ref.email}
                                            onChange={(val) => {
                                                const newRefs = [...references];
                                                newRefs[index] = { ...newRefs[index], email: val };
                                                updateResume({ sections: { ...sections, references: newRefs } });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TemplateDani;
