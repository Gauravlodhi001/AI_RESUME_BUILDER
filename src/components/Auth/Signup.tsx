import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SignUpProps {
  navigate: (page: string) => void;
  onToggle: () => void;
}

const SignUp = ({ navigate, onToggle }: SignUpProps) => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await register(email, password);
      navigate('builder');
    } catch (error: any) {
      console.error('Error signing up:', error);
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please sign in instead.');
        onToggle(); // Switch to Sign In mode
      } else {
        alert('Failed to sign up: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-3xl font-bold text-gray-100 mb-2">Sign Up</h2>

      <div className="space-y-4">
        <Input
          label="Your email"
          type="email"
          placeholder="andrew@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Your password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSignUp}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
      >
        {loading ? 'Signing Up...' : 'Submit'}
      </Button>

      <div className="text-right text-sm text-gray-400 mt-2">
        Already have an account?{' '}
        <button onClick={onToggle} className="text-gray-200 hover:underline">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;