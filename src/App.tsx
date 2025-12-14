import { useState } from 'react';
import LandingPage from './components/Auth/LandingPage';
import ResumeBuilder from './components/ResumBuilder/ResumeBuilder';
import useAuth from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('landing');

  // Simple router function
  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-slate-900 text-white">Loading...</div>;
  }

  // If user is signed in, default to builder unless they want to go back
  if (user && currentPage === 'landing') {
     // Optional: Auto-redirect to builder if logged in
     // setCurrentPage('builder');
  }

  return (
    <>
      {currentPage === 'landing' && <LandingPage navigate={navigate} />}
      {currentPage === 'builder' && <ResumeBuilder user={user} navigate={navigate} />}
    </>
  );
}

export default App;