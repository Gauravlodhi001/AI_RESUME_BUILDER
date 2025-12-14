import { useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SignInProps {
  navigate: (page: string) => void;
  onToggle: () => void;
}

const SignIn = ({ navigate, onToggle }: SignInProps) => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      // For this project, we'll use anonymous sign-in for simplicity.
      // In a real application, you'd use email/password or social providers.
      await signInAnonymously(auth);
      navigate('builder');
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      alert('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-100">Sign In</h2>
      <p className="text-center text-gray-400">
        Sign in to access your saved resumes.
      </p>

      {/* For now, we use a single button to sign in anonymously */}
      <Button onClick={handleSignIn} disabled={loading} className="w-full">
        {loading ? 'Signing In...' : 'Sign In Anonymously'}
      </Button>

      <div className="text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <button onClick={onToggle} className="text-blue-400 hover:underline">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
