import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/'); // Redirect ke Home setelah verifikasi
      } else if (event === 'ERROR') {
        navigate('/login', { state: { error: 'Authentication failed' } });
      }
    });
  }, [navigate]);

  return <div>Loading...</div>;
}

export default AuthCallback;