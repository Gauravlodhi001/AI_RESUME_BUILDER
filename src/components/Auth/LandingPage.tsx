import { useState } from 'react';
import SignIn from './SignIn';      // ✅ Correct (same folder)
import SignUp from './SignUp';      // ✅ Correct (same folder)

interface LandingPageProps {
  navigate: (page: string) => void;
}

const LandingPage = ({ navigate }: LandingPageProps) => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-gray-100 p-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">AI Resume Builder</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Craft your perfect resume in minutes with the help of artificial intelligence.
        </p>
      </div>

      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        {isSignIn ? (
          <SignIn navigate={navigate} onToggle={() => setIsSignIn(false)} />
        ) : (
          <SignUp navigate={navigate} onToggle={() => setIsSignIn(true)} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;