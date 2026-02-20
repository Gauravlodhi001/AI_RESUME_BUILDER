import { useState } from 'react';
import { Resume } from '../../services/resumeService';
import {
    User,
    BookOpen,
    Briefcase,
    GraduationCap,
    Code,
    Users,
    ChevronRight,
    ChevronDown
} from 'lucide-react';

interface SidebarProps {
    resume: Resume;
    updateResume: (data: any) => void;
    sections: { id: string; name: string }[];
    updateSectionName: (id: string, name: string) => void;
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const Sidebar = ({ resume, updateResume, sections, updateSectionName, activeSection, setActiveSection }: SidebarProps) => { // Removed props not needed anymore
    const [editingSection, setEditingSection] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateResume({ [name]: value });
    };

    const startEditing = (id: string, currentName: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingSection(id);
        setEditValue(currentName);
    };

    const saveSectionName = (id: string) => {
        if (editValue.trim()) {
            updateSectionName(id, editValue);
        }
        setEditingSection(null);
    };

    const getIcon = (id: string) => {
        switch (id) {
            case 'personal': return <User size={18} />;
            case 'summary': return <BookOpen size={18} />;
            case 'experience': return <Briefcase size={18} />;
            case 'education': return <GraduationCap size={18} />;
            case 'skills': return <Code size={18} />;
            case 'references': return <Users size={18} />;
            default: return <User size={18} />;
        }
    };

    return (
        <aside className="w-full bg-[#0f172a] border-r border-gray-800 flex flex-col h-full text-gray-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-400">
                    <User size={20} />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg leading-tight">PROFILE BUILDER</h1>
                </div>
            </div>

            {/* Navigation & Forms */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2 custom-scrollbar">
                {sections.map((section) => (
                    <div key={section.id} className="space-y-2">
                        <div
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer ${activeSection === section.id
                                ? 'bg-transparent text-white'
                                : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800'
                                }`}
                            onClick={() => setActiveSection(section.id)}
                        >
                            <div className="flex items-center gap-3 flex-1">
                                {getIcon(section.id)}
                                {editingSection === section.id ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => saveSectionName(section.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') saveSectionName(section.id);
                                        }}
                                        autoFocus
                                        className="bg-gray-800 text-white px-2 py-1 rounded outline-none border border-cyan-500 w-full"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                ) : (
                                    <span
                                        onDoubleClick={(e) => startEditing(section.id, section.name, e)}
                                        title="Double click to rename"
                                        className="flex-1"
                                    >
                                        {section.name}
                                    </span>
                                )}
                            </div>
                            {activeSection === section.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>

                        {/* Active Section Form Content */}
                        {activeSection === section.id && (
                            <div className="px-2 pb-4 space-y-4 animate-fadeIn">
                                {section.id === 'personal' && (
                                    <div className="space-y-3">
                                        <div className="bg-gray-900/50 p-2 rounded border border-gray-700 focus-within:border-cyan-500 transition-colors">
                                            <label className="block text-xs text-gray-400 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={resume.data.name || ''}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent text-white outline-none text-sm placeholder-gray-600"
                                                placeholder="Example: John Doe"
                                            />
                                        </div>
                                        <div className="bg-gray-900/50 p-2 rounded border border-gray-700 focus-within:border-cyan-500 transition-colors">
                                            <label className="block text-xs text-gray-400 mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={resume.data.email || ''}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent text-white outline-none text-sm placeholder-gray-600"
                                                placeholder="example@email.com"
                                            />
                                        </div>
                                        <div className="bg-gray-900/50 p-2 rounded border border-gray-700 focus-within:border-cyan-500 transition-colors">
                                            <label className="block text-xs text-gray-400 mb-1">Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={resume.data.phone || ''}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent text-white outline-none text-sm placeholder-gray-600"
                                                placeholder="+1 234 567 890"
                                            />
                                        </div>
                                        <div className="bg-gray-900/50 p-2 rounded border border-gray-700 focus-within:border-cyan-500 transition-colors">
                                            <label className="block text-xs text-gray-400 mb-1">Website</label>
                                            <input
                                                type="text"
                                                name="website"
                                                value={resume.data.website || ''}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent text-white outline-none text-sm placeholder-gray-600"
                                                placeholder="www.yoursite.com"
                                            />
                                        </div>
                                        <div className="bg-gray-900/50 p-2 rounded border border-gray-700 focus-within:border-cyan-500 transition-colors">
                                            <label className="block text-xs text-gray-400 mb-1">LinkedIn</label>
                                            <input
                                                type="text"
                                                name="linkedin"
                                                value={resume.data.linkedin || ''}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent text-white outline-none text-sm placeholder-gray-600"
                                                placeholder="https://linkedin.com/in/username"
                                            />
                                        </div>
                                        <div className="bg-gray-900/50 p-2 rounded border border-gray-700 focus-within:border-cyan-500 transition-colors">
                                            <label className="block text-xs text-gray-400 mb-1">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={resume.data.address || ''}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent text-white outline-none text-sm placeholder-gray-600"
                                                placeholder="City, Country"
                                            />
                                        </div>
                                    </div>
                                )}
                                {section.id === 'skills' && (
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {resume.data.sections.skills.map((skill: string, index: number) => (
                                                <span key={index} className="px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded text-xs border border-cyan-900/50 flex items-center gap-1">
                                                    {skill}
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                placeholder="+ Add Skill"
                                                className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 outline-none focus:bg-gray-700 transition"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        const val = e.currentTarget.value.trim();
                                                        if (val) {
                                                            updateResume({
                                                                sections: {
                                                                    ...resume.data.sections,
                                                                    skills: [...resume.data.sections.skills, val]
                                                                }
                                                            });
                                                            e.currentTarget.value = '';
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {section.id === 'summary' && (
                                    <div className="bg-gray-900/50 p-2 rounded border border-gray-700 focus-within:border-cyan-500 transition-colors h-40">
                                        <textarea
                                            name="summary"
                                            value={resume.data.summary || ''}
                                            onChange={handleInputChange}
                                            className="w-full h-full bg-transparent text-white outline-none text-sm placeholder-gray-600 resize-none custom-scrollbar"
                                            placeholder="Brief professional summary..."
                                        />
                                    </div>
                                )}
                                {section.id === 'references' && (
                                    <div className="space-y-3">
                                        <p className="text-xs text-gray-500 italic">References are managed in the main resume view.</p>
                                    </div>
                                )}
                                {/* Placeholder for other sections */}
                                {['experience', 'education'].includes(section.id) && (
                                    <div className="p-4 text-center border border-dashed border-gray-700 rounded-lg bg-gray-900/30">
                                        <p className="text-xs text-gray-500">Edit {section.name} content in the main canvas or use AI Assistant.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Template Selection & Download removed from here */}
        </aside>
    );
};

export default Sidebar;
