import { useState } from 'react';
import LandingPage from './components/Auth/LandingPage';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import Dashboard from './components/Dashboard/Dashboard';
import About from './components/Pages/About';
import Pricing from './components/Pages/Pricing';
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

  // If user is signed in, default to dashboard.
  // Note: In a real auth flow, we might handle this differently, but simple check works here.
  const isAuthPage = currentPage === 'landing' || currentPage === 'about' || currentPage === 'pricing';
  if (user && isAuthPage) {
    // Optional: Redirect to dashboard if logged in and on landing page
    // if (currentPage === 'landing') setCurrentPage('dashboard');
  }

  return (
    <>
      {currentPage === 'landing' && <LandingPage navigate={navigate} />}
      {currentPage === 'builder' && <ResumeBuilder user={user} navigate={navigate} />}
      {currentPage === 'dashboard' && <Dashboard user={user} navigate={navigate} />}
      {currentPage === 'about' && <About navigate={navigate} />}
      {currentPage === 'pricing' && <Pricing navigate={navigate} />}
    </>
  );
}



export default App;