import Navbar from '../Auth/Navbar';
import { Check, Star } from 'lucide-react';

interface PricingProps {
    navigate: (page: string) => void;
}

const Pricing = ({ navigate }: PricingProps) => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Navbar
                onLoginClick={() => navigate('landing')}
                onSignupClick={() => navigate('landing')}
                navigate={navigate}
            />

            <section className="pt-20 pb-10 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, transparent pricing</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Start for free, upgrade when you need to. No hidden fees.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Free Tier */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors shadow-sm relative">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
                            <div className="text-4xl font-bold mb-6">$0</div>
                            <p className="text-gray-500 mb-8">Perfect for getting started with your first resume.</p>

                            <button
                                onClick={() => navigate('landing')}
                                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors mb-8"
                            >
                                Get Started Free
                            </button>

                            <ul className="space-y-4 text-sm text-gray-600">
                                <li className="flex items-center gap-3"><Check size={18} className="text-green-500" /> 1 Resume Template</li>
                                <li className="flex items-center gap-3"><Check size={18} className="text-green-500" /> Basic AI Suggestions</li>
                                <li className="flex items-center gap-3"><Check size={18} className="text-green-500" /> PDF Download</li>
                            </ul>
                        </div>

                        {/* Pro Tier */}
                        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl transform md:-translate-y-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-transparent w-full h-2"></div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white">Pro</h3>
                                <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">MOST POPULAR</div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-6">$9<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                            <p className="text-gray-400 mb-8">For serious job seekers who want to stand out.</p>

                            <button
                                onClick={() => navigate('landing')}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors mb-8 hover:shadow-lg hover:shadow-blue-500/25"
                            >
                                Upgrade to Pro
                            </button>

                            <ul className="space-y-4 text-sm text-gray-300">
                                <li className="flex items-center gap-3"><div className="bg-blue-900/50 p-1 rounded-full"><Check size={14} className="text-blue-400" /></div> Unlimited Resumes</li>
                                <li className="flex items-center gap-3"><div className="bg-blue-900/50 p-1 rounded-full"><Check size={14} className="text-blue-400" /></div> All Premium Templates</li>
                                <li className="flex items-center gap-3"><div className="bg-blue-900/50 p-1 rounded-full"><Check size={14} className="text-blue-400" /></div> Advanced AI Writer</li>
                                <li className="flex items-center gap-3"><div className="bg-blue-900/50 p-1 rounded-full"><Check size={14} className="text-blue-400" /></div> Cover Letter Generator</li>
                                <li className="flex items-center gap-3"><div className="bg-blue-900/50 p-1 rounded-full"><Check size={14} className="text-blue-400" /></div> Priority Support</li>
                            </ul>
                        </div>

                        {/* Enterprise Tier */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Lifetime</h3>
                            <div className="text-4xl font-bold mb-6">$99</div>
                            <p className="text-gray-500 mb-8">One-time payment for lifetime access.</p>

                            <button
                                onClick={() => navigate('landing')}
                                className="w-full py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-900 font-bold rounded-xl transition-colors mb-8"
                            >
                                Buy Lifetime
                            </button>

                            <ul className="space-y-4 text-sm text-gray-600">
                                <li className="flex items-center gap-3"><Star size={18} className="text-yellow-500" /> Everything in Pro</li>
                                <li className="flex items-center gap-3"><Check size={18} className="text-green-500" /> No Monthly Subscription</li>
                                <li className="flex items-center gap-3"><Check size={18} className="text-green-500" /> Future Updates Included</li>
                                <li className="flex items-center gap-3"><Check size={18} className="text-green-500" /> Exclusive Templates</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
