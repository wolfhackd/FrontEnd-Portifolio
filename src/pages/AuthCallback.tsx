import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) return;

    // fetch(`${import.meta.env.API}/auth/github`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ code: code }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     //passar um token pro axios
    //     if (data.user?.login === 'wolfhackd') {
    //       localStorage.setItem('auth', 'true');

    //       navigate('/dashboard');
    //     } else {
    //       alert('Acesso negado 😅');
    //       navigate('/login');
    //     }
    //   });

    const response = async (code: any) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API}/auth/github`,
          { code: code },
          { withCredentials: true },
        );

        if (res.data.message === 'Authenticated') {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    response(code);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Autenticando com GitHub...</p>
    </div>
  );
}
