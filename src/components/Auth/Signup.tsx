import { useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SignUpProps {
  navigate: (page: string) => void;
  onToggle: () => void;
}

const SignUp = ({ navigate, onToggle }: SignUpProps) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // For this project, sign-up is the same as anonymous sign-in.
      await signInAnonymously(auth);
      navigate('builder');
    } catch (error) {
      console.error('Error signing up anonymously:', error);
      alert('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-100">Sign Up</h2>
      <p className="text-center text-gray-400">
        Create a new account to get started.
      </p>

      {/* For now, we use a single button to sign up anonymously */}
      <Button onClick={handleSignUp} disabled={loading} className="w-full">
        {loading ? 'Signing Up...' : 'Sign Up Anonymously'}
      </Button>

      <div className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <button onClick={onToggle} className="text-blue-400 hover:underline">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;