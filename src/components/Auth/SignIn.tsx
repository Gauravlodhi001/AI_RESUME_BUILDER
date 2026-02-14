import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SignInProps {
  navigate: (page: string) => void;
  onToggle: () => void;
}

const SignIn = ({ navigate, onToggle }: SignInProps) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await login(email, password);
      navigate('builder');
    } catch (error: any) {
      console.error('Error signing in:', error);
      alert('Failed to sign in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-3xl font-bold text-gray-100 mb-2">Sign In</h2>

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
        onClick={handleSignIn}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
      >
        {loading ? 'Signing In...' : 'Submit'}
      </Button>

      <div className="text-right text-sm text-gray-400 mt-2">
        New here?{' '}
        <button onClick={onToggle} className="text-gray-200 hover:underline">
          Register
        </button>
      </div>
    </div>
  );
};

export default SignIn;
