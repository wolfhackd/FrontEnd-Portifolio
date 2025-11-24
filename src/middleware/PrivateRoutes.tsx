import axios from 'axios';
import { useEffect, useState, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: ReactElement }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API}/me`, {
  //     method: 'GET',
  //     credentials: 'include',
  //   })
  //     .then(async (res) => {
  //       if (res.ok) {
  //         setAuthenticated(true);
  //       } else {
  //         setAuthenticated(false);
  //       }
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setAuthenticated(false);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/me`, {
          withCredentials: true,
        });

        setAuthenticated(res.status === 200);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) return <div>Carregando...</div>;

  if (!authenticated) return <Navigate to="/" replace />;

  return children;
}
