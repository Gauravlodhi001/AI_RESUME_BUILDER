
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, authenticateWithToken } from '../services/firebase';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(false);
      }
    });

    if (!user) {
      authenticateWithToken()
        .then(signedInUser => {
          setUser(signedInUser);
          setLoading(false);
        })
        .catch(error => {
          console.error('Authentication failed:', error);
          setLoading(false);
        });
    }

    return () => unsubscribe();
  }, [user]);

  return { user, loading };
};

export default useAuth;
