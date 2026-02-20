
import { FileText } from 'lucide-react';

interface NavbarProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
    navigate?: (page: string) => void;
    isLoggedIn?: boolean;
}

const Navbar = ({ onLoginClick, onSignupClick, navigate, isLoggedIn = false }: NavbarProps) => {
    return (
        <nav className="flex justify-between items-center py-4 px-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-all duration-300">
            <div
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate ? navigate('landing') : window.location.reload()}
            >
                <FileText className="text-blue-600 w-8 h-8" />
                <span className="text-xl font-bold text-gray-900 tracking-tight">Resum<span className="text-blue-600">AI</span></span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
                {navigate && (
                    <>
                        <button onClick={() => navigate('landing')} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Templates</button>
                        <button onClick={() => navigate('pricing')} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Pricing</button>
                        <button onClick={() => navigate('about')} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">About Us</button>
                    </>
                )}
            </div>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate && navigate('dashboard')}
                            className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            Dashboard
                        </button>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                            G
                        </div>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={onLoginClick}
                            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                        >
                            Login
                        </button>
                        <button
                            onClick={onSignupClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
                        >
                            Get Started
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
