import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) return;

    fetch(`${import.meta.env.API}/auth/github`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        //passar um token pro axios
        if (data.user?.login === 'wolfhackd') {
          localStorage.setItem('auth', 'true');

          navigate('/dashboard');
        } else {
          alert('Acesso negado 😅');
          navigate('/login');
        }
      });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Autenticando com GitHub...</p>
    </div>
  );
}
