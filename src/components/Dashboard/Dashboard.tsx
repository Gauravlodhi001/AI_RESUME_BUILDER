import { FileText, Plus, MoreVertical, Calendar, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../Auth/Navbar';

interface DashboardProps {
    user: any;
    navigate: (page: string) => void;
}

const Dashboard = ({ user, navigate }: DashboardProps) => {
    // Mock data for resumes (in a real app, this would come from Firebase)
    const resumes = [
        { id: 1, name: 'Software Engineer Resume', lastEdited: '2 days ago', progress: 85 },
        { id: 2, name: 'Product Manager Application', lastEdited: '1 week ago', progress: 60 },
        { id: 3, name: 'Creative Portfolio', lastEdited: '3 weeks ago', progress: 100 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Navbar
                onLoginClick={() => { }} // User is already logged in
                onSignupClick={() => { }}
                isLoggedIn={true}
                navigate={navigate}
            />

            <main className="container mx-auto px-6 py-12">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.displayName || 'Creator'}! 👋</h1>
                        <p className="text-gray-600">You're one step closer to your dream job.</p>
                    </div>
                    <button
                        onClick={() => navigate('builder')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
                    >
                        <Plus size={20} /> Create New Resume
                    </button>
                </div>

                {/* Stats / Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">3</h3>
                                <p className="text-sm text-gray-500">Total Resumes</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">15m</h3>
                                <p className="text-sm text-gray-500">Avg. Editing Time</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">2</h3>
                                <p className="text-sm text-gray-500">Interviews Landed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumes Grid */}
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FileText size={20} className="text-gray-400" /> Your Resumes
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Create New Card */}
                    <button
                        onClick={() => navigate('builder')}
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-gray-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all group h-[280px]"
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-transform">
                            <Plus size={32} />
                        </div>
                        <span className="font-bold">Create New Resume</span>
                    </button>

                    {/* Resume Cards */}
                    {resumes.map(resume => (
                        <div key={resume.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-[280px] group cursor-pointer" onClick={() => navigate('builder')}>
                            {/* Preview Area (Mock) */}
                            <div className="flex-1 bg-gray-100 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <FileText size={80} />
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="w-full bg-white text-gray-900 font-bold py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                                        Edit Resume <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Info Area */}
                            <div className="p-5 border-t border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{resume.name}</h3>
                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} /> Edited {resume.lastEdited}
                                    </span>
                                    <span className="font-medium bg-green-100 text-green-700 px-2 py-1 rounded-md">
                                        {resume.progress}% Complete
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
