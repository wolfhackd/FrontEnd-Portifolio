import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = document.cookie.includes('token='); // ou checar via contexto

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
