import { useEffect, useState, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: ReactElement }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3333/me', {
      method: 'GET',
      credentials: 'include', // envia os cookies HTTP-only
    })
      .then(async (res) => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;

  // Se não estiver autenticado, redireciona para login
  if (!authenticated) return <Navigate to="/" replace />;

  // Caso contrário, mostra o conteúdo protegido
  return children;
}
