import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Clock, Briefcase, CheckCircle, ArrowRight, FileCheck, Zap, MessageSquare, Shield, Layout, Globe } from 'lucide-react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Navbar from './Navbar';

interface LandingPageProps {
  navigate: (page: string) => void;
}

const LandingPage = ({ navigate }: LandingPageProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const openSignIn = () => {
    setIsSignIn(true);
    setShowAuthModal(true);
  };

  const openSignUp = () => {
    setIsSignIn(false);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      <Navbar onLoginClick={openSignIn} onSignupClick={openSignUp} navigate={navigate} />

      {/* Auth Modal Overlay */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowAuthModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            {isSignIn ? (
              <SignIn navigate={navigate} onToggle={() => setIsSignIn(false)} />
            ) : (
              <SignUp navigate={navigate} onToggle={() => setIsSignIn(true)} />
            )}
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left z-10">

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
                India's Top <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Resume Templates</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Get the job 2x as fast. Use recruiter-approved templates and AI-powered content recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={openSignUp}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  Create new resume <ArrowRight size={20} />
                </button>
                <button
                  onClick={openSignIn}
                  className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-gray-900 transition-all flex items-center justify-center gap-2"
                >
                  Optimize my resume
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500" /> No credit card required</span>
                <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500" /> Free to try</span>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 z-0"></div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500"
              >
                <img
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Resume Preview"
                  className="rounded-xl shadow-2xl border-4 border-white mx-auto w-full max-w-md"
                />

                {/* Floating Badge */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg text-white">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">AI Status</p>
                    <p className="text-sm font-bold text-gray-900">Enhanced</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Create a resume <br />
              that gets <span className="text-green-600">results</span>
            </h2>
            <button onClick={openSignUp} className="text-blue-600 font-bold text-lg hover:underline flex items-center justify-center gap-2">
              Choose a template <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Camera size={32} />, title: 'Recruiter-Approved', desc: 'Templates designed by HR experts specifically for the top job markets.' },
              { icon: <Clock size={32} />, title: 'Finish in 15 Min', desc: 'Our AI does the heavy lifting, from professional summaries to skill sorting.' },
              { icon: <Briefcase size={32} />, title: 'Land an Interview', desc: 'Get 2x more callbacks instantly with ATS-optimized content.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">100% Free - <span className="text-blue-600">Forever</span></h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Layout className="text-purple-500" />, title: '35+ Template Designs', desc: 'Premium designs for every role and industry.' },
              { icon: <Zap className="text-yellow-500" />, title: 'Enhance with AI', desc: 'Smart content suggestions to improve your resume.' },
              { icon: <FileCheck className="text-green-500" />, title: 'ATS Check', desc: 'Ensure your resume passes automated filtering systems.' },
              { icon: <MessageSquare className="text-blue-500" />, title: 'AI Cover Letter', desc: 'Generate matching cover letters in seconds.' },
              { icon: <Globe className="text-teal-500" />, title: 'Resume Website', desc: 'Publish your resume online with a custom link.' },
              { icon: <Shield className="text-red-500" />, title: 'Data Privacy', desc: 'Your data is secure and never shared with third parties.' },
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 cursor-default group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-800 pb-8 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">Resum<span className="text-blue-500">AI</span></span>
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <button onClick={() => navigate('landing')} className="hover:text-white transition-colors">Templates</button>
              <button onClick={() => navigate('pricing')} className="hover:text-white transition-colors">Pricing</button>
              <button onClick={() => navigate('about')} className="hover:text-white transition-colors">About Us</button>
            </div>
          </div>
          <div className="text-center text-sm">
            &copy; {new Date().getFullYear()} ResumAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;