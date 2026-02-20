import Navbar from '../Auth/Navbar';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface AboutProps {
    navigate: (page: string) => void;
}

const About = ({ navigate }: AboutProps) => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Navbar
                onLoginClick={() => navigate('landing')}
                onSignupClick={() => navigate('landing')}
                navigate={navigate}
            />

            {/* Hero */}
            <section className="pt-20 pb-20 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">We're on a mission to <br /><span className="text-blue-600">get you hired.</span></h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        ResumAI was built by recruiters and engineers who were tired of seeing great candidates get rejected by bad resume formatting.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team" className="rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Why ResumAI?</h2>
                            <p className="text-gray-600 leading-relaxed">
                                The modern job market is broken. ATS (Applicant Tracking Systems) filter out 75% of resumes before a human ever sees them. We built ResumAI to reverse those odds.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'AI-Powered content suggestions tailored to your industry.',
                                    'Designs approved by HR professionals from top tech companies.',
                                    'Privacy-first approach: your data is yours.',
                                    'Completely free for job seekers, forever.'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="bg-green-100 text-green-600 p-1 rounded-full mt-1">
                                            <CheckCircle size={16} />
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8">Ready to build your future?</h2>
                    <button
                        onClick={() => navigate('landing')}
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 inline-flex items-center gap-2"
                    >
                        Build Your Resume Now <ArrowRight size={20} />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default About;
